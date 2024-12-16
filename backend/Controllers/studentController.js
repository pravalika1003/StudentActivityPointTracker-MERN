// controllers/studentController.js

const StudentModel = require("../Models/Student"); // Ensure correct path to the Student model
const MentorModel = require("../Models/Mentor");

// Function to get student details, including marks and uploaded files
const getStudentDetails = async (req, res) => {
    const { email } = req.params; // Get email from URL params

    try {
        const student = await StudentModel.findOne({ email });
        if (!student) {
            return res.status(404).json({ success: false, message: 'Student not found' });
        }
        res.json({ success: true, student });
    } catch (error) {
        console.error('Error fetching student details:', error);
        res.status(500).json({ success: false, message: 'Error fetching details' });
    }
};
const getMentorDetails = async (req, res) => {
    const { email } = req.params; // Get email from URL params

    try {
        const mentor = await MentorModel.findOne({ email });
        if (!mentor) {
            return res.status(404).json({ success: false, message: 'mentor not found' });
        }
        res.json({ success: true, mentor });
    } catch (error) {
        console.error('Error fetching mentor details:', error);
        res.status(500).json({ success: false, message: 'Error fetching details' });
    }
};


module.exports = {
    getStudentDetails,
    getMentorDetails,

};
