import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { handleSuccess } from '../utils';
import './styles/StudentDashboard.css';

function StudentDashboard() {
  const [student, setStudent] = useState({});
  const [loggedInUser, setLoggedInUser] = useState('');
  const [isProfileOpen, setIsProfileOpen] = useState(false); // State to toggle profile info visibility
  const { email } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/mentor/student/${email}/details`);
        setStudent(response.data.student);
      } catch (error) {
        console.error('Error fetching student details:', error);
      }
    };
    fetchStudentDetails();
    
    setLoggedInUser(localStorage.getItem('loggedInUser'));
  }, [email]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    handleSuccess('User Logged out');
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  const toggleProfileInfo = () => {
    setIsProfileOpen(!isProfileOpen); // Toggle profile info visibility
  };

  return (
    <div className="student-dashboard">
      <div className="db-image"></div>
      <div className="welcome-banner">
        <h2 style={{ color: "#262d41" }}>Welcome, {student.name || 'Student'}!</h2>
        <p>Total Points: <strong>{student.marks || 0}</strong></p>
        
        {/* Profile Icon and Logout Button Container */}
        <div className="header-buttons">
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>

          <div className="profile-icon">
            <img
              src="https://t4.ftcdn.net/jpg/08/19/66/31/360_F_819663119_che4sZSrmQv8uQJOzuN9TVQFQNHJlfQ2.jpg"
              alt="Profile Icon"
              onClick={toggleProfileInfo} // Toggle profile info visibility on click
            />
            {isProfileOpen && (
              <div className="profile-info">
                <p className="profile-detail">Name: {student.name || 'Student'}</p>
                <p className="profile-detail">Role: {loggedInUser ? 'Student' : 'Guest'}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="button-group">
      <div 
          className="dashboard-button" 
          onClick={() => navigate(`/student/${email}/upload`)}
        >
          <img src="https://thumbs.dreamstime.com/b/file-upload-glyphs-icon-file-upload-glyphs-icon-elements-mobile-concept-web-apps-thin-line-icons-website-design-104430672.jpg" alt="Upload File" />
          <span>File Upload</span>
        </div>
        <div 
          className="dashboard-button" 
          onClick={() => navigate(`/student/${email}/view-files`)}
        >
          <img src="https://cdn-icons-png.flaticon.com/256/72/72647.png" alt="View Files" />
          <span>Uploaded Files</span>
        </div>
        
        
        <div 
          className="dashboard-button" 
          onClick={() => navigate('/student/viewdetails')}
        >
          <img src="https://www.shutterstock.com/image-vector/evaluation-criteria-icon-line-vector-600nw-2445089389.jpg" alt="View Details" />
          <span>Reference Sheet</span>
        </div>
      </div>
      
    </div>
  );
}

export default StudentDashboard;
