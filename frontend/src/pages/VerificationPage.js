import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './styles/VerificationPage.css'
function VerificationPage() {
  const { email } = useParams(); // Extract student email from URL
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/mentor/student/${email}/files`);
        if (response.data.success) {
          console.log('Files:', response.data.files);
          setFiles(response.data.files);
        }
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    };

    if (email) fetchFiles();
  }, [email]);

  const handleApprove = async (fileId) => {
    const marks = prompt("Enter marks for approval:");
    if (!marks) return;

    try {
      await axios.post(`http://localhost:8080/api/mentor/student/${email}/approve`, { fileId, marks });
      setFiles(files.filter(file => file._id !== fileId)); // Remove approved file from list
    } catch (error) {
      console.error('Error approving file:', error);
    }
  };

  const handleReject = async (fileId) => {
    try {
      await axios.post(`http://localhost:8080/api/mentor/student/${email}/reject`, { fileId });
      setFiles(files.filter(file => file._id !== fileId)); // Remove rejected file from list
    } catch (error) {
      console.error('Error rejecting file:', error);
    }
  };

  return (
    <div className="verification-page">
      <h2>Verification Page for {email}</h2>
      {files && files.length > 0 ? (
        <ul>
          {files.map((file) => (
            <li key={file._id} className="file-container">
              <div className="file-details">
                <p>File name: 
                  <a href={`http://localhost:8080/uploads/${file.filename}`} target="_blank" rel="noopener noreferrer">
                    {file.originalname}
                  </a>
                </p>
              </div>

              {/* Buttons container */}
              <div className="buttons-container">
                <button onClick={() => handleApprove(file._id)} className="approve-btn">Approve</button>
                <button onClick={() => handleReject(file._id)} className="reject-btn">Reject</button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No files available for verification.</p>
      )}
    </div>
  );
}

export default VerificationPage;
