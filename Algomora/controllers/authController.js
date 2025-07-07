const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');

exports.signup = async (req, res) => {
  try {
    const { name, username, password } = req.body;
    console.log('Signup request body:', req.body);

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      console.log('Username already exists');
      return res.status(400).json({ error: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, username, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: 'User created', user });
  } catch (err) {
    console.error('Signup error:', err); // Log server-side error
    res.status(500).json({ error: err.message });
  }
};



exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const mongoose = require('mongoose'); // Ensure mongoose is imported
const Card = require('../models/Card'); // Add this at the top

exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate the userId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid user ID format' });
    }

    const user = await User.findById(id).populate('cards');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).json({ error: 'Server error' });
  }
};


exports.uploadPhoto = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    const photoPath = `/uploads/${req.file.filename}`;
    user.photo = photoPath;
    await user.save();

    res.json({ photo: photoPath });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
