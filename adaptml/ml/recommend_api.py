from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import joblib
import pandas as pd
from bson import ObjectId
import os
from dotenv import load_dotenv
import pymongo

# Load .env variables
load_dotenv()
MONGO_URID = os.getenv("MONGO_URID")

app = Flask(__name__)
CORS(app)

# ✅ FIXED: Use correct environment variable for MongoDB URI
client = pymongo.MongoClient(MONGO_URID)
db = client['dBase']  # ⚠️ Make sure this matches your actual DB name
profiles = db['userprofiles']  # ✅ Match collection name used by Express (no underscore!)

# Load trained model, encoder, and expected feature order
model = joblib.load('./models/content_model.pkl')
encoder = joblib.load('./models/encoder.pkl')
model_features = joblib.load('./models/model_features.pkl')

# Load questions dataset
df_questions = pd.read_csv('./data/simulated_recommendation_dataset.csv')
df_questions = df_questions.drop_duplicates(subset=['problem_id'])

@app.route('/recommend', methods=['POST'])
def recommend():
    data = request.json
    user_id = data.get('user_id')
    print("🔍 Received user_id:", user_id)

    try:
        print("📋 All user_ids in DB:", [p.get('userId') for p in profiles.find({}, {'userId': 1})])
        user_profile = profiles.find_one({"userId": user_id}, {'topics': 1, '_id': 0})
    except Exception as e:
        print("❌ Error while querying user_id:", e)
        return jsonify({"error": "Invalid user ID format or DB connection error"}), 400

    if not user_profile:
        print("⚠️ No profile found for user_id:", user_id)
        return jsonify({"error": "User profile not found"}), 404

    topic_proficiency = user_profile.get("topics", {})
    recommendations = []

    for _, row in df_questions.iterrows():
        topic = row['problem_topic']
        difficulty = row['difficulty']
        question_id = row['problem_id']

        combined_input = {**topic_proficiency, "difficulty": difficulty, "problem_topic": topic}
        df_input = pd.DataFrame([combined_input])

        try:
            # One-hot encode 'problem_topic'
            encoded_topic = encoder.transform(df_input[['problem_topic']])
            encoded_df = pd.DataFrame(encoded_topic, columns=encoder.get_feature_names_out(['problem_topic']))

            df_final = pd.concat([
                df_input.drop(columns=['problem_topic']).reset_index(drop=True),
                encoded_df.reset_index(drop=True)
            ], axis=1)

            # Align columns to match training features
            for col in model_features:
                if col not in df_final.columns:
                    df_final[col] = 0  # add missing with 0

            df_final = df_final[model_features]  # ensure correct order

            proba = model.predict_proba(df_final)[0][1]
        except Exception as e:
            print("❌ Error during prediction:", e)
            continue

        recommendations.append((question_id, proba))

    recommendations.sort(key=lambda x: x[1], reverse=True)
    top_10 = [{"question_id": qid, "score": round(score, 4)} for qid, score in recommendations[:10]]

    return jsonify({"recommendations": top_10})

if __name__ == '__main__':
    print(app.url_map)
    app.run(port=5001)
