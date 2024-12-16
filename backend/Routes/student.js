const express = require('express');
const router = express.Router();
const File = require('../Models/File');
const multer = require('multer');
const { getStudentDetails } = require('../Controllers/studentController');



// Route to get student details
router.get('/details/:email', getStudentDetails);

// Set up multer for file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });


// File upload route
router.post('/upload', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' }); // Handle missing file
  }
  const newFile = new File({
    name: req.file.filename,
    studentId: req.student.email, // Ensure req.student is defined and contains the email
    status: 'Pending',
  });


  try {
    await newFile.save();
    res.status(200).json(newFile);
  } catch (error) {
    console.error('Error saving file:', error);
    res.status(500).json({ error: error.message });
  }
});


// Fetch student files and points
router.get('/files', async (req, res) => {
  try {
    const files = await File.find({ studentId: req.student.email });
    const points = files.reduce((acc, file) => (file.status === 'Approved' ? acc + file.points : acc), 0);
    res.status(200).json({ files, points });
  } catch (error) {
    console.error('Error fetching files:', error);
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;
