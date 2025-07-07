# ml/recommend_top_n.py
import sys, json
import joblib
import pandas as pd

model = joblib.load("./ml/content_model.pkl")

# Parse input from Node
user_data = json.loads(sys.argv[1])
topics = ['arrays', 'strings', 'linked_lists', 'stacks_queues', 'trees',
          'graphs', 'dp', 'recursion', 'sorting_searching', 'math']

# Create DataFrame
X_input = pd.DataFrame([user_data])[topics]

# Predict top N
probs = model.predict_proba(X_input)[0]
top_indices = sorted(range(len(probs)), key=lambda i: probs[i], reverse=True)

# Dummy question IDs (replace with actual logic later)
question_ids = [f"L{str(i+1).zfill(4)}" for i in top_indices]

# Return top-N with dummy match score
output = [{"question_id": qid, "match_score": round(probs[i], 4)} for i, qid in enumerate(question_ids)]
print(json.dumps(output))
