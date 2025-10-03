import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@contexts/AuthContext';
import ProtectedRoute from '@components/routing/ProtectedRoute';
import MainAppLayout from '@components/layout/MainAppLayout';
import Login from '@pages/auth/Login';
import Register from '@pages/auth/Register';
import { ROUTES } from '@/constants';
import { protectedRoutes } from '@components/routing/routeConfig';

const RouteHandler: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Public routes */}
      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route path={ROUTES.REGISTER} element={<Register />} />
      
      {/* Protected routes - dynamically generated from config */}
      {protectedRoutes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={
            <ProtectedRoute>
              <MainAppLayout>{route.element}</MainAppLayout>
            </ProtectedRoute>
          }
        />
      ))}
      
      {/* Redirect authenticated users away from auth pages */}
      <Route 
        path="*" 
        element={
          isAuthenticated ? <Navigate to={ROUTES.HOME} replace /> : <Navigate to={ROUTES.LOGIN} replace />
        } 
      />
    </Routes>
  );
};

export default RouteHandler;
