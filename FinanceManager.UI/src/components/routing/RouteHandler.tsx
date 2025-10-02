import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import LoadingSpinner from '../common/LoadingSpinner';
import MainAppLayout from '../layout/MainAppLayout';
import Login from '../../pages/auth/Login';
import Register from '../../pages/auth/Register';
import { ROUTES } from '../../constants';

const RouteHandler: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();

  // Handle loading state
  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Routes>
      {/* Public routes */}
      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route path={ROUTES.REGISTER} element={<Register />} />
      
      {/* Protected routes */}
      <Route 
        path={ROUTES.HOME} 
        element={
          isAuthenticated ? <MainAppLayout /> : <Navigate to={ROUTES.LOGIN} replace />
        } 
      />
      <Route 
        path={ROUTES.DASHBOARD} 
        element={
          isAuthenticated ? <MainAppLayout /> : <Navigate to={ROUTES.LOGIN} replace />
        } 
      />
      <Route 
        path={ROUTES.TRANSACTIONS} 
        element={
          isAuthenticated ? <MainAppLayout /> : <Navigate to={ROUTES.LOGIN} replace />
        } 
      />
      <Route 
        path={ROUTES.ACCOUNTS} 
        element={
          isAuthenticated ? <MainAppLayout /> : <Navigate to={ROUTES.LOGIN} replace />
        } 
      />
      <Route 
        path={ROUTES.CATEGORIES} 
        element={
          isAuthenticated ? <MainAppLayout /> : <Navigate to={ROUTES.LOGIN} replace />
        } 
      />
      
      {/* Redirect authenticated users away from auth pages */}
      <Route 
        path="*" 
        element={
          isAuthenticated ? <Navigate to={ROUTES.DASHBOARD} replace /> : <Navigate to={ROUTES.LOGIN} replace />
        } 
      />
    </Routes>
  );
};

export default RouteHandler;
