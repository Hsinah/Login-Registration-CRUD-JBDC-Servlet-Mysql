// src/pages/EditProfile.jsx (Modified to use class names)

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import './Register.css';

const EditProfile = () => {
  const { user, editProfile, deleteProfile, logout } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState(user.email);
  const [statusMessage, setStatusMessage] = useState('');

  const handleUpdate = async (e) => {
    e.preventDefault();
    setStatusMessage('');

    const result = await editProfile({ email });

    if (result.success) {
      setStatusMessage('✅ Profile updated successfully!');
    } else {
      setStatusMessage('❌ Update failed.');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete your profile? This action is irreversible.')) {
      const result = await deleteProfile();
      if (result.success) {
        alert('Profile deleted. You are now logged out.');
        navigate('/login');
      } else {
        setStatusMessage('❌ Deletion failed.');
      }
    }
  };

  // Helper function to get status message class
  const getStatusClass = (message) => {
    if (!message) return '';
    return message.startsWith('✅') ? 'success' : 'error';
  }

  return (
    // Apply the main container class
    <div className="profile-container">
      <h2>Edit Profile</h2>
      {/* Apply the form class */}
      <form onSubmit={handleUpdate} className="profile-form">
        <label>Username (Read-only):</label>
        <input type="text" value={user.username} disabled />
        
        <label>Email:</label>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        
        {/* Apply conditional status message class */}
        {statusMessage && (
            <p className={`status-message ${getStatusClass(statusMessage)}`}>
                {statusMessage}
            </p>
        )}
        {/* Apply the update button class */}
        <button type="submit" className="update-button">Update Profile</button>
      </form>

      {/* Apply the custom hr class */}
      <hr className="danger-zone-separator" />
      
      {/* Apply the danger zone container class */}
      <div className="danger-zone-container">
        <h3>Danger Zone</h3>
        {/* Apply the delete button class */}
        <button 
          onClick={handleDelete} 
          className="delete-button"
        >
          Delete Profile
        </button>
        {/* Apply the delete note class */}
        <p className="delete-note">This will permanently delete your user account.</p>
      </div>
    </div>
  );
};

export default EditProfile;