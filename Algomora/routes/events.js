const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

// GET all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET one random event (optional)
router.get('/random', async (req, res) => {
  try {
    const count = await Event.countDocuments();
    const random = Math.floor(Math.random() * count);
    const event = await Event.findOne().skip(random);
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
