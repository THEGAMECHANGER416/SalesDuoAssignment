const express = require('express');
const router = express.Router();
const { processMeeting } = require('../controllers/meetingNotesController.js');

router.post('/process-meeting', processMeeting);

module.exports = router;
