const { signup, login, mentorsignup, mentorlogin } = require('../Controllers/AuthController');
const { signupValidation, loginValidation } = require('../Middlewares/AuthValidation');

const router = require('express').Router();

router.post('/login', loginValidation, login);
router.post('/signup', signupValidation, signup);
router.post('/mentorlogin', loginValidation, mentorlogin);
router.post('/mentorsignup', signupValidation, mentorsignup);

module.exports = router;