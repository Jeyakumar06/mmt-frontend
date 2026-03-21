import React, { createContext, useState, useContext, useEffect } from 'react';
import { loginApi } from '../api/auth';
import { useLocation } from 'wouter';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Check if user is already logged in
    if (token) {
      setUser({ email: localStorage.getItem('userEmail') });
    }
    setLoading(false);
  }, [token]);

  const login = async (email, password, rememberMe) => {
    try {
      const response = await loginApi(email, password);
      const { token } = response.data;
      
      // Store token
      localStorage.setItem('token', token);
      localStorage.setItem('userEmail', email);
      
      if (rememberMe) {
        localStorage.setItem('rememberMe', 'true');
      } else {
        // Use sessionStorage for session-only storage
        sessionStorage.setItem('token', token);
      }
      
      setToken(token);
      setUser({ email });
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('rememberMe');
    sessionStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setLocation('/login');
  };

  const value = {
    user,
    login,
    logout,
    token,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};