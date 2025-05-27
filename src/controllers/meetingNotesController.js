const { processMeetingNotes } = require('../services/meetingNotesService');

exports.processMeeting = (req, res) => {
    const meetingNotes = req.body;
    console.log('Received meeting notes:', meetingNotes);
    processMeetingNotes(meetingNotes)
        .then(result => {
            res.json(result);
        })
        .catch(error => {
            console.error('Error processing meeting notes:', error);
            res.status(500).json({ message: 'Error processing meeting notes', error });
        });
};
