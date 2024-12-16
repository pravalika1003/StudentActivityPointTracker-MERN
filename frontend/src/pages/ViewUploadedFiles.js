import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './styles/ViewUploadedFiles.css';

function ViewUploadedFiles() {
  const [files, setFiles] = useState([]);
  const { email } = useParams();

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/files/${email}`);
        setFiles(response.data);
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    };
    fetchFiles();
  }, [email]);

  return (
    <div className="main-container">
      <h3 className="uploaded-files-title">Uploaded Files</h3>
      <div className="files-page">
      

        {/* Pending Files */}
        <div className="file-section">
          <h4 className="pending-files-text">Pending Files</h4>
          {files.filter(file => file.status === 'pending').map(file => (
            <div key={file._id} className="my-2">
              <a
                href={`http://localhost:8080/uploads/${file.filename}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-primary w-100"
              >
                {file.originalname}
              </a>
            </div>
          ))}
          {files.filter(file => file.status === 'pending').length === 0 && (
            <p className="text-center no-files-text">No pending files</p>
          )}
        </div>

        {/* Approved Files */}
        <div className="file-section">
          <h4 className="text-success">Approved Files</h4>
          {files.filter(file => file.status === 'Approved').map(file => (
            <div key={file._id} className="my-2">
              <a
                href={`http://localhost:8080/uploads/${file.filename}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-success w-100"
              >
                {file.originalname}
              </a>
            </div>
          ))}
          {files.filter(file => file.status === 'Approved').length === 0 && (
            <p className="text-center no-files-text">No approved files</p>
          )}
        </div>

        {/* Rejected Files */}
        <div className="file-section">
          <h4 className="text-danger">Rejected Files</h4>
          {files.filter(file => file.status === 'Rejected').map(file => (
            <div key={file._id} className="my-2">
              <a
                href={`http://localhost:8080/uploads/${file.filename}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-danger w-100"
              >
                {file.originalname}
              </a>
            </div>
          ))}
          {files.filter(file => file.status === 'Rejected').length === 0 && (
            <p className="text-center no-files-text">No rejected files</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewUploadedFiles;
