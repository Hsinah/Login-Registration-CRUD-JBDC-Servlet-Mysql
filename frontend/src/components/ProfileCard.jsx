// src/components/ProfileCard.jsx (Modified to use class names)

import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

const ProfileCard = () => {
  const { user } = useAuth();
  const [showInfo, setShowInfo] = useState(false);

  const toggleInfo = () => setShowInfo(!showInfo);

  if (!user) return null;

  return (
    <div 
      // Apply the main card class
      className="profile-card"
      onClick={toggleInfo} 
      onMouseEnter={() => setShowInfo(true)} // Hover effect
      onMouseLeave={() => setShowInfo(false)} // Hover effect
    >
      <h3>👤 {user.username}'s Profile</h3>
      {showInfo && (
        // Apply the details class
        <div className="profile-details">
          <p><strong>ID:</strong> {user.id}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
          <p className="toggle-note">Click or hover to toggle details!</p>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;