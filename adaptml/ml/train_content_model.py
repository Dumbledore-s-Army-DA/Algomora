import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, accuracy_score
from sklearn.preprocessing import OneHotEncoder
import joblib
import os

# STEP 1: Load dataset
df = pd.read_csv('./data/simulated_recommendation_dataset.csv')

# STEP 2: Prepare features and label
X = df.drop(columns=['user_id', 'problem_id', 'label'])
y = df['label']

# STEP 3: One-Hot Encode the 'problem_topic' column if it's categorical
encoder = OneHotEncoder(sparse_output=False, handle_unknown='ignore')

if 'problem_topic' in X.columns and X['problem_topic'].dtype == object:
    encoded_topic = encoder.fit_transform(X[['problem_topic']])
    encoded_topic_df = pd.DataFrame(encoded_topic, columns=encoder.get_feature_names_out(['problem_topic']))

    # Drop original column and concatenate encoded one
    X = X.drop(columns=['problem_topic'])
    X = pd.concat([X.reset_index(drop=True), encoded_topic_df.reset_index(drop=True)], axis=1)

# ✅ Save the feature column order
feature_names = X.columns.tolist()

# STEP 4: Train-test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# STEP 5: Train Random Forest Classifier
clf = RandomForestClassifier(n_estimators=100, random_state=42)
clf.fit(X_train, y_train)

# STEP 6: Evaluate
y_pred = clf.predict(X_test)
print("✅ Accuracy:", accuracy_score(y_test, y_pred))
print("📊 Classification Report:\n", classification_report(y_test, y_pred))

# STEP 7: Save the model and preprocessing
os.makedirs('./models', exist_ok=True)
joblib.dump(clf, './models/content_model.pkl')
joblib.dump(feature_names, './models/model_features.pkl')      # Save feature order
joblib.dump(encoder, './models/encoder.pkl')                  # Save the OneHotEncoder

print("✅ Model and encoder saved to ./models/")
