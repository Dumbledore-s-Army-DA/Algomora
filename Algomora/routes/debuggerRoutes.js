const express = require('express');
const router = express.Router();
const debuggerController = require('../controllers/DebuggerController');

router.get('/questions', debuggerController.getDebuggerQuestions);
router.post('/submit', debuggerController.submitDebuggerResult);
router.get('/leaderboard/:eventId', debuggerController.getDebuggerLeaderboard);

module.exports = router;
