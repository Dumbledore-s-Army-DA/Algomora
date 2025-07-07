const express = require("express");
const router = express.Router(); 
const UserProfile = require("../models/UserProfile");
const axios = require("axios");

// Route to update user progress when a question is solved and get new recommendations
router.post("/solve", async (req, res) => {
  const { userId, questionId, topic } = req.body;

  try {
    const user = await UserProfile.findOne({ user_id: userId });
    if (!user) return res.status(404).json({ error: "User not found" });

    // Increment topic proficiency (max cap at 5)
    if (user.topic_proficiencies[topic] < 5) {
      user.topic_proficiencies[topic] += 1;
    }

    // Add question to solved list if not already there
    if (!user.questionsSolved.includes(questionId)) {
      user.questionsSolved.push(questionId);
    }

    await user.save();

    // Call ML recommendation API
    const { data: recommendations } = await axios.post("http://localhost:7000/recommend", {
      profile: user.topic_proficiencies,
      solved: user.questionsSolved
    });

    // Save recommendations to MongoDB
    user.recommended_questions = recommendations;
    await user.save();

    res.json({ message: "Progress updated!", recommendations });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Route to fetch recommended questions for a user
router.get("/recommend/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const profile = await UserProfile.findOne({ user_id: userId });

    if (!profile) {
      return res.status(404).json({ error: "User profile not found" });
    }

    res.json(profile.recommended_questions || []);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch recommendations" });
  }
});

module.exports = router;
