import pandas as pd
import joblib
import numpy as np

# Define the 10 DSA topics (same order as used in training)
TOPICS = [
    "arrays", "strings", "linked_lists", "stacks_queues", "trees",
    "graphs", "dp", "recursion", "sorting_searching", "math"
]

# 1. Load the trained model
model = joblib.load('./models/content_model.pkl')

# 2. Example input: user comfort levels on 10 topics (1–3)
# This will be replaced by actual user input from frontend/backend
user_input = {
    "arrays": 2,
    "strings": 3,
    "linked_lists": 1,
    "stacks_queues": 2,
    "trees": 1,
    "graphs": 3,
    "dp": 2,
    "recursion": 1,
    "sorting_searching": 2,
    "math": 2,
    "difficulty": 2,
    "problem_topic": "graphs"  # required for content filtering
}

# 3. Convert to DataFrame (1 row)
df_input = pd.DataFrame([user_input])

# 4. One-hot encode the `problem_topic` field
from sklearn.preprocessing import OneHotEncoder

encoder = OneHotEncoder(sparse_output=False, handle_unknown='ignore')
# Fit on all possible problem_topic values from the dataset
# You can save and reuse encoder if needed
topics_df = pd.read_csv('./data/simulated_recommendation_dataset.csv')
encoder.fit(topics_df[['problem_topic']])

encoded_topic = encoder.transform(df_input[['problem_topic']])
encoded_topic_df = pd.DataFrame(
    encoded_topic,
    columns=encoder.get_feature_names_out(['problem_topic'])
)

# 5. Combine input features
df_input_final = pd.concat([
    df_input.drop(columns=['problem_topic']).reset_index(drop=True),
    encoded_topic_df.reset_index(drop=True)
], axis=1)

# 6. Predict: 1 = recommend, 0 = not
prediction = model.predict(df_input_final)

# 7. Show result
if prediction[0] == 1:
    print("✅ Recommended: This problem fits the user’s level and topic.")
else:
    print("❌ Not Recommended: Try a different topic or level.")
