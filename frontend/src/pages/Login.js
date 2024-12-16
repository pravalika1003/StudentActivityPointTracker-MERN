import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';
import "./styles/Login.css";
import 'bootstrap/dist/css/bootstrap.min.css';

function Login({ loggedInEmail }) { // Expecting onLogin prop from parent

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
            const url = `${process.env.REACT_APP_API_URL}/auth/login`;
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
                loggedInEmail(name); // Notify parent component of the successful login
                setTimeout(() => {
                    navigate(`/studentdashboard/${email}`); // Navigate after a brief delay
                }, 1000);
            } else if (error) {
                const details = error?.details[0]?.message || message; // Fallback to message
                handleError(details);
            } else {
                handleError(message);
            }
            console.log(result);
        } catch (err) {
            handleError(err);
        }
    };

    return (
        <div className="login-page">
            <div className="background-image"></div>
            <div className="login-box">
                <h1>Login</h1>
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            onChange={handleChange}
                            type="email"
                            name="email"
                            placeholder="Enter your email..."
                            value={loginInfo.email}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            onChange={handleChange}
                            type="password"
                            name="password"
                            placeholder="Enter your password..."
                            value={loginInfo.password}
                            className="form-control"
                        />
                    </div>
                    <button type="submit" className="login-button">Login</button>
                    <span>Don't have an account?
                        <Link to="/signup" className="signup-link"> Signup</Link>
                    </span>
                </form>
                <ToastContainer />
            </div>
        </div>
    );
}

export default Login;
