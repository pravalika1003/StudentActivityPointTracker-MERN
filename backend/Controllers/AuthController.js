const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require("../Models/Student");
const MentorModel = require("../Models/Mentor");


const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(409)
                .json({ message: 'User already exist, you can login', success: false });
        }
        const userModel = new UserModel({ name, email, password });
        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save();
        res.status(201)
            .json({
                message: "Signup successfully",
                success: true
            })
    } catch (err) {
        res.status(500)
            .json({
                message: "Internal server error",
                success: false
            })
    }
}


const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        const errorMsg = 'Auth failed email or password is wrong';
        if (!user) {
            return res.status(403)
                .json({ message: errorMsg, success: false });
        }
        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) {
            return res.status(403)
                .json({ message: errorMsg, success: false });
        }
        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        )

        res.status(200)
            .json({
                message: "Login Success",
                success: true,
                jwtToken,
                email,
                name: user.name
            })
    } catch (err) {
        res.status(500)
            .json({
                message: "Internal server errror",
                success: false
            })
    }
}
const mentorsignup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const mentor = await MentorModel.findOne({ email });

        // Correct the condition here
        if (mentor) {
            return res.status(409)
                .json({ message: 'Mentor already exists, you can login', success: false });
        }

        const mentorModel = new MentorModel({ name, email, password });
        mentorModel.password = await bcrypt.hash(password, 10);
        await mentorModel.save();
        res.status(201)
            .json({
                message: "Signup successfully",
                success: true
            });
    } catch (err) {
        res.status(500)
            .json({
                message: "Internal server error",
                success: false
            });
    }
};


const mentorlogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const mentor = await MentorModel.findOne({ email });
        const errorMsg = 'Authentication failed: email or password is incorrect';
        
        if (!mentor) {
            return res.status(403).json({ message: errorMsg, success: false });
        }

        const isPassEqual = await bcrypt.compare(password, mentor.password);
        if (!isPassEqual) {
            return res.status(403).json({ message: errorMsg, success: false });
        }

        const jwtToken = jwt.sign(
            { email: mentor.email, _id: mentor._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(200).json({
            message: "Login Success",
            success: true,
            jwtToken,
            email: mentor.email,
            name: mentor.name
        });
    } catch (err) {
        console.error("Error in mentor login:", err); // Logs the exact error to the console
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};
const authenticateStudent = (req, res, next) => {
    // Logic to extract student info from token or session
    const studentEmail = req.headers['authorization']; // Example of how you might retrieve the token
  
    // Replace this with your actual logic to find student info
    if (studentEmail) {
      req.student = { email: studentEmail }; // Ensure you are attaching the right student object
      next();
    } else {
      return res.status(401).json({ error: 'Unauthorized' });
    }
};
  

module.exports = {
    signup,
    login,
    mentorsignup,
    mentorlogin,
    authenticateStudent
}