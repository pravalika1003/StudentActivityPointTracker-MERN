// routes/mentor.js
const express = require('express');
const router = express.Router();
const Student = require('../Models/Student');
const mentorController = require('../Controllers/mentorController');
const { getStudentDetails,getMentorDetails } = require('../Controllers/studentController');

// Fetch student files for verification
router.get('/student/:email/files',mentorController.getStudentFiles);
router.get('/student/:email/details', mentorController.getStudentDetails);
router.get('/mentor/:email/details', mentorController.getMentorDetails);








// Verify file route
router.post('/student/:email/verify', mentorController.verifyFile);
// Approve file route
router.post('/student/:email/approve', mentorController.approveFile);

// Reject file route
router.post('/student/:email/reject', mentorController.rejectFile);
router.get('/students', async (req, res) => {
    try {
      const students = await Student.find({}, 'name email'); // Adjust fields if needed
      res.json(students);
    } catch (error) {
      console.error('Error fetching students:', error);
      res.status(500).json({ message: 'Error fetching students' });
    }
  });

module.exports = router;
