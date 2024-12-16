import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';
import "./styles/Login.css";  // Reusing the Login.css for MentorLogin styling
import 'bootstrap/dist/css/bootstrap.min.css';

function MentorLogin() {
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = loginInfo;
        if (!email || !password) {
            return handleError('Email and password are required');
        }
        try {
            const url = `${process.env.REACT_APP_API_URL}/auth/mentorlogin`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginInfo)
            });
            const result = await response.json();
            const { success, message, jwtToken, name, error } = result;

            if (success) {
                handleSuccess(message);
                localStorage.setItem('token', jwtToken);
                localStorage.setItem('loggedInUser', name);
                setTimeout(() => {
                    navigate('/mentordashboard');
                }, 1000);
            } else {
                const details = error?.details[0]?.message || message;
                handleError(details);
            }
        } catch (err) {
            handleError(err);
        }
    };

    return (
        <div className="login-page">

            <div className="background-image"></div>
            <div className="login-box">
                <h1>Mentor Login</h1>
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            className="form-control"
                            onChange={handleChange}
                            type="email"
                            name="email"
                            placeholder="Enter mentor email..."
                            value={loginInfo.email}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            className="form-control"
                            onChange={handleChange}
                            type="password"
                            name="password"
                            placeholder="Enter your password..."
                            value={loginInfo.password}
                        />
                    </div>
                    <button className="login-button" type="submit">Login</button>
                    <span className="signup-text">
                        Don’t have an account? 
                        <Link to="/mentorsignup" className="signup-link"> Mentor Signup</Link>
                    </span>
                </form>
                <ToastContainer />
            </div>
        </div>
    );
}

export default MentorLogin;
