// controllers/mentorController.js 
const FileModel = require("../Models/File"); // Assuming you have a File model
const StudentModel = require("../Models/Student");
const MentorModel = require("../Models/Mentor"); // Assuming you have a Student model
// At the top of mentorController.js
const { getStudentDetails, getMentorDetails} = require('./studentController');


const getStudentFiles = async (req, res) => {
    const { email } = req.params;
    console.log('Received request for files of:', email); 

    try {
        const files = await FileModel.find({ email }); // Fetch files using the correct field
        console.log('Files found:', files); 
        res.status(200).json({ success: true, files });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error", success: false });
    }
};


const verifyFile = async (req, res) => {
    const { email } = req.params;
    const { fileId, marks } = req.body;

    try {
        const file = await FileModel.findById(fileId);
        if (!file) {
            return res.status(404).json({ message: "File not found", success: false });
        }

        // Update the file to show it's verified and save the marks
        file.verified = true;
        file.marks = marks; // Assuming your File model has 'verified' and 'marks' fields
        await file.save();

        // Update student's points in the StudentModel (ensure you have a 'points' field)
        const student = await StudentModel.findOne({ email });
        student.marks += marks; // Adjust based on your logic
        await student.save();

        res.status(200).json({ message: "File verified successfully", success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

const approveFile = async (req, res) => {
    const { fileId, marks } = req.body;
    try {
        const file = await FileModel.findByIdAndUpdate(fileId, {
            status: 'Approved',
            marks: marks // Store the awarded marks
        });
        
        // Optionally, update the student's total marks
        await StudentModel.findOneAndUpdate(
            { email: file.email }, // Ensure the correct field is used
            { $inc: { marks: marks } } // Increment the student's points
        );

        res.status(200).json({ message: 'File approved successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', success: false });
    }
};

const rejectFile = async (req, res) => {
    const { fileId } = req.body;
    try {
        const file = await FileModel.findByIdAndUpdate(fileId, {
            status: 'Rejected'
        });

        res.status(200).json({ message: 'File rejected successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', success: false });
    }
};
// Function to get mentor details


// Exporting the functions
module.exports = {
    getStudentFiles,
    getStudentDetails,
    getMentorDetails,
    verifyFile,
    approveFile,
    rejectFile,
   
};
