import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import MentorLogin from './pages/MentorLogin';
import LandingPage from './pages/Landingpage'; 
import { useState } from 'react';
import RefrshHandler from './RefreshHandler';
import StudentDashboard from './pages/StudentDashboard';  // Import StudentDashboard
import MentorDashboard from './pages/MentorDashboard';
import MentorSignup from './pages/MentorSignup';
import VerificationPage from './pages/VerificationPage';
import ViewUploadedFiles from './pages/ViewUploadedFiles';
import ViewDetails from './pages/ViewDetails';
import FileUpload from './pages/FileUpload';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loggedInEmail, setLoggedInEmail] = useState('');

  const handleLogin = (email) => {
    setIsAuthenticated(true);
    setLoggedInEmail(email);
  };

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />
  }

  return (
    
    <div className="App">
      <div className="header-bar">
                
      </div>
      <RefrshHandler setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/login' element={<Login loggedInEmail={handleLogin} />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/mentorlogin' element={<MentorLogin />} />
        <Route path="/studentdashboard/:email" element={<PrivateRoute element={<StudentDashboard loggedInEmail={loggedInEmail} setIsAuthenticated={setIsAuthenticated} />} />} />
        <Route path='/mentorsignup' element={<MentorSignup />} />
        <Route path='/mentordashboard' element={<MentorDashboard />} />
        <Route path="/verification/:email" element={<VerificationPage />} />
        <Route path="/student/:email/view-files" element={<ViewUploadedFiles />} /> {/* Update the route */}
        <Route path="/student/viewdetails" element={<ViewDetails />} />
        <Route path="/student/:email/upload" element={<FileUpload />} />
        
        


      </Routes>
    </div>
  );
}

export default App;