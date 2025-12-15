// src/pages/Register.jsx (Modified to use class names)

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import './Register.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [name,setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [country,setCountry] = useState('');
  const [dob,setDOB] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage('');
    
    const result = await register({ username, password, email,name,country,dob });

    if (result.success) {
      setStatusMessage('✅ Registration successful! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000); // Redirect after 2 seconds
    } else {
      setStatusMessage('❌ Registration failed. Please try again.');
    }
  };

  // Helper function to determine class name for status message
  const getStatusClass = (message) => {
    if (!message) return '';
    return message.startsWith('✅') ? 'success' : 'error';
  }

  return (
    // Add the main container class
    <div className="register-container">
      <h2>Register</h2>
      {/* Use the form class and remove inline styles */}
      <form onSubmit={handleSubmit} className="register-form">
        <input 
            type="text" 
            placeholder="Username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
        />
        <input 
          type='text'
          placeholder='Name'
          value = {name}
          onChange={(e) => setName(e.target.value)}
          required
          />
        <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
        />
        <input 
            type="text" 
            placeholder="Country" 
            value={country} 
            onChange={(e) => setCountry(e.target.value)} 
            required 
        />
        <input 
            type="text" 
            placeholder="DOB" 
            value={dob} 
            onChange={(e) => setDOB(e.target.value)} 
            required 
        />
        <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
        />
        

        {statusMessage && (
            <p className={`status-message ${getStatusClass(statusMessage)}`}>
                {statusMessage}
            </p>
        )}
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;