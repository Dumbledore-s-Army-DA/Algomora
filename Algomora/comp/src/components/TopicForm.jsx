import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './topicform.css'; // Make sure path is correct
const topics = [
  "Arrays", "Strings", "Linked Lists", "Stacks Queues",
  "Trees", "Graphs", "Dynamic Programming", "Recursion",
  "Sorting & Searching", "Math"
];

const TopicForm = () => {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const handleChange = (topic, value) => {
    setFormData({ ...formData, [topic]: parseInt(value) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");
    console.log("📦 Sending user_id to /recommend:", userId)
    if (!userId) {
      alert("User ID not found. Please sign up again.");
      return;
    }

    const payload = {
      userId,
      topics: formData
    };

    console.log("📤 Submitting topic data to backend:", payload); // <-- Debug line

    try {
      // 1. Save topic proficiency to backend
      await axios.post("http://localhost:5000/api/userProfile", payload);

      // 2. Trigger ML recommendations
      await axios.post("http://127.0.0.1:5001/recommend", {
  user_id: localStorage.getItem("userId")
}, {
  headers: {
    "Content-Type": "application/json"
  }
});


      // 3. Navigate to profile
      navigate("/profile/${userId}");
    } catch (err) {
      console.error("❌ Submission failed:", err);
      alert("Error submitting data. Please check console.");
      console.dir(err.response?.data || err.message);
    }
  };

  return (
    

<form onSubmit={handleSubmit} className="topic-form-container">
  <h2>Rate Your Topic Proficiency</h2>

  {topics.map((topic) => (
    <div key={topic} className="topic-block">
      <label className="topic-label">{topic.replace('_', ' ')}</label>
      <div className="radio-group">
        {[1, 2, 3].map((level) => (
          <label key={level} className="radio-option">
            <input
              type="radio"
              name={topic}
              value={level}
              required
              onChange={(e) => handleChange(topic, e.target.value)}
            />
            {level === 1 ? '📖 Beginner' : level === 2 ? '🧠 Intermediate' : '🧙 Advanced'}
          </label>
        ))}
      </div>
    </div>
  ))}

  <button type="submit">Submit ✨</button>
</form>

  );
};

export default TopicForm;
