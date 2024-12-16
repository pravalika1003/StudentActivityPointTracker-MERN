const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const dotenv = require('dotenv');
const mongoose=require('mongoose');
const File = require('./Models/File'); // Adjust the path as necessary
app.use("/uploads", express.static("uploads"));

// Routes
const AuthRouter = require('./Routes/AuthRouter');
const StudentRouter = require('./Routes/student');
const MentorRouter = require('./Routes/mentor');

// Initialize environment variables
dotenv.config();
require('./Models/db');
require('./Models/File');
app.use(cors())

// Ensure the 'uploads' directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Set up multer for file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'uploads')); // Store files in 'uploads' directory
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);

  }
});

const upload = multer({ storage: storage });


// POST route for file upload
app.post('/upload', upload.single('file'), async (req, res) => {
  console.log('req.body:', req.body); // Log req.body to see all fields
  console.log('req.file:', req.file); // Log req.file to confirm file details
  try {
  
    const email = req.body.email; // Retrieve email from request body
    const file = req.file;
    console.log('Received file:', file);
    console.log('Received email:', email); // Log the email to check if it's captured
    if (!file || !email) {
      return res.status(400).json({ error: 'File or email is missing' });
    }
    const filePath = `/uploads/${file.filename}`;

    // Save file details and email to MongoDB
    const newFile = new File({
      filename: file.filename,
      originalname: file.originalname,
      email: email, // Save the email in the file document
      filePath: filePath // Save file path in the document
    });

    await newFile.save();
    console.log("File saved to database with email:", newFile);

    res.status(200).json({ message: 'File uploaded successfully', file: newFile });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: 'Failed to upload file' });
  }
});
// In your server.js or a dedicated routes file
app.get('/files/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const files = await File.find({ email:email }); 
    console.log(files)// Ensure this line filters by email
    res.status(200).json(files);
  } catch (error) {
    console.error('Error fetching files:', error);
    res.status(500).json({ message: 'Error fetching files' });
  }
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Other Routers
app.use('/auth', AuthRouter);
app.use('/api/student', StudentRouter);  
app.use('/api/mentor', MentorRouter);  

// Signup Routes
app.post('/auth/signup', (req, res) => {
  res.json({ message: 'Signup successful' });
});

app.post('/auth/mentorsignup', (req, res) => {
  res.json({ message: 'Signup successful' });
});


// Start Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);

});
