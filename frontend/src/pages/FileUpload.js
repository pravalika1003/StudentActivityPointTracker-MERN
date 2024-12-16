import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
/* import 'react-toastify/dist/ReactToastify.css'; */
import './styles/FileUpload.css';

function FileUpload() {
  const [file, setFile] = useState(null);
  const { email } = useParams(); // Fetch email from the URL parameters

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !email) {
      toast.error('Please select a file and enter your email!');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('email', email);

    try {
      const response = await axios.post('http://localhost:8080/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast.success(response.data.message);
      setFile(null); // Clear the file input after upload
    } catch (error) {
      toast.error('Error uploading file.');
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div className="upload-page">
      <h2>File Upload</h2>
      <form onSubmit={handleUpload}>
        <div className="form-group">
          <label htmlFor="file" className="form-label">Select File:</label>
          <label htmlFor="file" className="file-input-label">
            {file ? file.name : 'Choose a file'}
          </label>
          <input 
            type="file" 
            id="file"
            className="file-input"
            onChange={handleFileChange} 
            required 
          />
        </div>
        <button type="submit" className="btn btn-primary w-100 mt-3">Upload File</button>
      </form>
      <ToastContainer className="toast-container" />
    </div>
  );
}

export default FileUpload;
