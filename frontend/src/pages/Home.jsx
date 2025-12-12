// src/pages/Home.jsx

import React from 'react';
import ProfileCard from '../components/ProfileCard';

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Protected Home Page!</h1>
      <p>This content is only visible to logged-in users.</p>
      <div style={{ marginTop: '20px' }}>
        <ProfileCard />
      </div>
    </div>
  );
};

export default Home;