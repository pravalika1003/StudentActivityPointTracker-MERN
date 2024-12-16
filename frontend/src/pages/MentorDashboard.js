import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles/MentorDashboard.css'; // Import the CSS file

function MentorDashboard() {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/mentor/students');
        console.log("Student data:", response.data); // Check the structure of the data
        setStudents(response.data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, []);

  const handleStudentClick = (email) => {
    navigate(`/verification/${email}`);
  };

  return (
    <div className="mentor-dashboard">
      <h3>Registered Students</h3>
      <div className="student-list">
        {students.length === 0 ? (
          <p>No students registered yet.</p>
        ) : (
          <ul>
            {students.map((student) => (
              <li key={student.email}>
                <button onClick={() => handleStudentClick(student.email)}>
                  {student.name} - {student.email}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default MentorDashboard;
