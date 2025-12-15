
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

    

const login = async (username, password) => {
    const data = new URLSearchParams();
    data.append("username", username);
    data.append("password", password);

    let response;
    let text = "";
    
    try {
      response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: data,
      });

      text = await response.text();

      let result = {};
      if (text) {
        try {
          result = JSON.parse(text);
        } catch (err) {
          console.error("JSON parse error:", err);
        }
      }

      if (!response.ok) {
        const message = result.message || `HTTP error! Status: ${response.status}`;
        console.error("Login failed (HTTP status not OK):", message);
        return { success: false, message: message };
      }

      console.log("Backend Response:", result);
      if (result.success) {
        return { success: true, message: "Login successful!" };
      } else {
        return { success: false, message: result.message || "Login failed!" };
      }

    } catch (error) {
      console.error("Login failed (Network Error):", error);
      return { success: false, message: "Network error or server unavailable." };
    }
};



  const logout = () => {
    setUser(null);
  };

  const register = async (username, password, email,name,country,dob) => {
    const data = URLSearchParams();
    data.append("username",username);
    data.append("password",password);
    data.append("name",name);
    data.append("email",email);
    data.append("dob",dob);
    data.append("country",country);

    let response;
    let text = "";
    try{
      response = await fetch("/api/login",{
        method:"POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body:data
      });

      text = await response.json();
      
      if(text){
        try{
        result = JSON.parse(text);
      }catch{
        console.error("JSON Parse Failed");
      }
      
      if(!response.ok){
        const message = result.message || `HTTP error! Status: ${response.status}`;
        console.error("Register failed (HTTP status not OK):", message);
        return { success: false, message: message };
      }

      if (result.success) {
        return { success: true, message: "Login successful!" };
      } else {
        return { success: false, message: result.message || "Login failed!" };
      }
      }
        
      }
      catch(err){
      console.error("Registeration Falied (Network Error)",err)

    }

    


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