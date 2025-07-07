const UserProfile = require('../models/UserProfile');

exports.saveUserProfile = async (req, res) => {
  console.log("🔥 Received POST /api/userProfile:", req.body); // Debug log

  try {
    const { userId, topics } = req.body;

    // Basic validation
    if (!userId || !topics || typeof topics !== 'object') {
      console.warn("⚠️ Invalid request: missing userId or topics.");
      return res.status(400).json({ error: 'Missing or invalid userId or topics' });
    }

    // Log what's being saved
    console.log(`📝 Saving profile for userId: ${userId}`);
    console.log("📚 Topics:", topics);

    // Upsert (update if exists, otherwise create)
    const profile = await UserProfile.findOneAndUpdate(
      { userId },
      { topics },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    console.log("✅ Profile saved/updated successfully.");

    res.status(201).json({ message: 'Profile saved', profile });
    console.log("🚀 Sent response:", profile);
  } catch (err) {
    console.error('❌ Error saving profile:', err);
    res.status(500).json({ error: 'Server error' });
  }
};
