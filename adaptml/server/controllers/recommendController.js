const { spawn } = require('child_process');
const UserProfile = require('../models/UserProfile');

exports.getRecommendations = async (req, res) => {
  const { userId } = req.body;

  try {
    const user = await UserProfile.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const python = spawn('python', [
      './ml/recommend_top_n.py',
      JSON.stringify(user)
    ]);

    let data = '';
    python.stdout.on('data', (chunk) => {
      data += chunk.toString();
    });

    python.stderr.on('data', (err) => {
      console.error(`Python Error: ${err}`);
    });

    python.on('close', () => {
      try {
        const recommended = JSON.parse(data);
        const filtered = recommended.filter(
          q => !user.solvedQuestions.includes(q.question_id)
        ).slice(0, 10); // Top 10 only

        res.json({ recommendations: filtered });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Recommendation parsing failed" });
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
