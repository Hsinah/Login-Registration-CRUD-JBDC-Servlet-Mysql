// src/components/Header.jsx (Modified to use class names)

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import './components.css';

const Header = () => {
    const { isLoggedIn, user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        // Apply the main header class
        <header className="app-header">
            {/* Apply the brand class */}
            <Link to="/" className="header-brand">
                My Auth App
            </Link>
            {/* Apply the nav class */}
            <nav className="header-nav">
                {isLoggedIn ? (
                    <>
                        {/* Apply the welcome message class */}
                        <span className="welcome-message">Welcome, **{user.username}**!</span>
                        {/* Links get the default header-nav a styling */}
                        <Link to="/edit-profile">Edit Profile</Link>
                        {/* Apply the logout button class */}
                        <button onClick={handleLogout} className="logout-button">
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        {/* Links get the default header-nav a styling */}
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </nav>
        </header>
    );
};

export default Header;