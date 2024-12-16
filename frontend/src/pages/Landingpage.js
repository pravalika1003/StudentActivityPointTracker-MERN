import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/LandingPage.css';

function LandingPage() {
    return (
        <div className="landing-page">
            <div className="landing-image"></div>

            {/* Header Bar */}
            <div className="landing-header-bar">
                
            </div>

            <div className="landing-page-content">
                {/* Left Side Description */}
                <div className="left-section">
                    <h1>Student Activity Points Tracker</h1>
                    <h2>Track Your Progress</h2>
                    <p>
                        Stay on top of your academic and extracurricular achievements. 
                        Track your activity points to reach your goals and enhance your 
                        overall experience as a student.
                    </p>
                </div>

                {/* Right Side Role Selection */}
                <div className="right-section">
                    <div className="card shadow p-4 role-selection-card">
                        <h3 className="card-title">Select Your Role</h3>
                        <div className="role-selection">
                            <Link to="/login" className="btn btn-primary btn-lg role-button">Student</Link>
                            <Link to="/mentorlogin" className="btn btn-secondary btn-lg role-button">Mentor</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;
