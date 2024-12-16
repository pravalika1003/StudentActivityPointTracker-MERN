import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';
import "./styles/Login.css";  // Reusing the Login.css for Signup styling

function Signup() {
    const [signupInfo, setSignupInfo] = useState({
        name: '',
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignupInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        const { name, email, password } = signupInfo;
        if (!name || !email || !password) {
            return handleError('Name, email, and password are required');
        }
        try {
            const url = `${process.env.REACT_APP_API_URL}/auth/signup`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signupInfo)
            });
            const result = await response.json();
            const { success, message, error } = result;

            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate('/login');
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
                <h1>Signup</h1>
                <form onSubmit={handleSignup}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            className="form-control"
                            onChange={handleChange}
                            type="text"
                            name="name"
                            placeholder="Enter your name..."
                            value={signupInfo.name}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            className="form-control"
                            onChange={handleChange}
                            type="email"
                            name="email"
                            placeholder="Enter your email..."
                            value={signupInfo.email}
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
                            value={signupInfo.password}
                        />
                    </div>
                    <button className="login-button" type="submit">Signup</button>
                    <span className="signup-text">
                        Already have an account? 
                        <Link to="/login" className="signup-link"> Login</Link>
                    </span>
                </form>
                <ToastContainer />
            </div>
        </div>
    );
}

export default Signup;
