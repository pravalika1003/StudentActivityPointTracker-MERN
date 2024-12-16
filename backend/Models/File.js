// models/File.js
const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true, // This field is required
  },
  originalname: {
    type: String,
    required: true, // This field is also required
  },
  email: {
    type: String,
    required: true, // This field is also required
  },
  filePath: {
    type: String,
    required: true, // This field is also required
  },
  uploadDate: { type: Date, default: Date.now },
  status: { type: String, enum: ['approved', 'rejected', 'pending'], default: 'pending' }, // New field for status
  marks: { type: Number, default: null },
  
});


const FileModel = mongoose.model('File', fileSchema);
module.exports = FileModel;
