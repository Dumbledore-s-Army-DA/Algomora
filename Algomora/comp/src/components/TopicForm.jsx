import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const topics = [
  "arrays", "strings", "linked_lists", "stacks_queues",
  "trees", "graphs", "dp", "recursion",
  "sorting_searching", "math"
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
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Rate Your Topic Proficiency</h2>
      {topics.map((topic) => (
        <div key={topic} className="mb-3">
          <label className="block capitalize">{topic.replace('_', ' ')}</label>
          <select
            required
            onChange={(e) => handleChange(topic, e.target.value)}
            className="w-full border px-2 py-1 rounded"
          >
            <option value="">Select rating</option>
            <option value="1">1 - Noob</option>
            <option value="2">2 - Intermediate</option>
            <option value="3">3 - Pro</option>
          </select>
        </div>
      ))}
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Submit
      </button>
    </form>
  );
};

export default TopicForm;
