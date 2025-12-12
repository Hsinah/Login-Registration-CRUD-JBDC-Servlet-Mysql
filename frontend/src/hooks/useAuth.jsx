
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [isLoggedIn, setIsLoggedIn] = useState(!!user);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      setIsLoggedIn(true);
    } else {
      localStorage.removeItem('user');
      setIsLoggedIn(false);
    }
  }, [user]);

  // --- Mock API Calls (Replace with actual backend calls later) ---

  // NOTE: In a real app, these functions would make an HTTP request (e.g., fetch/axios)
  // to your Java backend, receive a token/user object, and set the state.
    
  const login = async (username, password) => {
      // URLSearchParams creates the application/x-www-form-urlencoded body
      const data = new URLSearchParams();

      data.append('username', username);
      data.append('password', password);
      //data.append('login', 'login');

      try {
        const response = await fetch('/api/login', {  
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: data
        });

        // Check if the HTTP status is successful (200-299)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log("Backend Response:", result);
        
        if (result.success) {
          const mockUser = { id: 1, username, email: `${username}@example.com`, role: 'user' };
          // setUser(mockUser); // Re-enable this when using a real state
          return { success: true, message: "Login successful!" };
        } else {
          return { success: false, message: "Login failed!" };        
        }
        
      } catch (error) {
        console.error("Login failed:", error);
        // This will catch network errors AND HTTP status errors
        return { success: false, message: "Network error or server unavailable." };
      }
    };

  const logout = () => {
    setUser(null);
  };

  const register = async (userData) => {
    // 1. Send registration data to your Java backend (e.g., POST to /api/register)
    // **For this example, we mock a successful registration:**
    console.log(`Attempting registration for: ${userData.username}`);
    return { success: true, message: "Registration successful!" };
  };

  const editProfile = async (updatedData) => {
    // 1. Send updated data to your Java backend (e.g., PUT to /api/profile)
    // 2. If successful, backend returns updated user data.
    // **For this example, we mock the update:**
    console.log(`Updating profile for: ${user.username}`);
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    return { success: true, message: "Profile updated successfully!" };
  };

  const deleteProfile = async () => {
    // 1. Send request to delete profile on your Java backend (e.g., DELETE to /api/profile)
    // **For this example, we mock the delete:**
    console.log(`Deleting profile for: ${user.username}`);
    logout(); // Log out after deletion
    return { success: true, message: "Profile deleted successfully!" };
  };


  const value = {
    user,
    isLoggedIn,
    login,
    logout,
    register,
    editProfile,
    deleteProfile
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};