import { useBoundStore } from '@/store/store';
import React from 'react';
import { Navigate } from 'react-router-dom'; // Assuming you're using react-router

const ProtectedRoute = ({ children }) => {
  const token = useBoundStore((state) => state.token);

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
