
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

    
// useAuth.jsx

const login = async (username, password) => {
    const data = new URLSearchParams();
    data.append("username", username);
    data.append("password", password);

    let response; // Declare response outside try-catch to access in catch block
    let text = "";
    
    try {
      response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: data,
      });

      text = await response.text(); // Always read raw body first

      // --- Attempt to parse response body regardless of success status ---
      let result = {};
      if (text) {
        try {
          result = JSON.parse(text);
        } catch (err) {
          console.error("JSON parse error:", err);
          // If parsing fails, fall back to default error handling
        }
      }

      // If HTTP status is NOT OK (4xx or 5xx)
      if (!response.ok) {
        // Return server's message if it sent one, otherwise a generic HTTP error
        const message = result.message || `HTTP error! Status: ${response.status}`;
        console.error("Login failed (HTTP status not OK):", message);
        return { success: false, message: message };
      }

      // If HTTP status IS OK (2xx) and we have a result
      console.log("Backend Response:", result);
      if (result.success) {
        return { success: true, message: "Login successful!" };
      } else {
        // Handle successful HTTP status but failed login (e.g., wrong password)
        return { success: false, message: result.message || "Login failed!" };
      }

    } catch (error) {
      // This handles network errors (fetch failure)
      console.error("Login failed (Network Error):", error);
      return { success: false, message: "Network error or server unavailable." };
    }
};

// ... (rest of useAuth.jsx)


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