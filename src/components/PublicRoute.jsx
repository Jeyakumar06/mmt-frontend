import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Redirect } from 'wouter';

const PublicRoute = ({ children }) => {
  const { token, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  if (token) {
    return <Redirect to="/dashboard" />;
  }

  return children;
};

export default PublicRoute;