// components/ProtectedRoute.tsx
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isAuthenticated = !!localStorage.getItem('jwt'); // Check for JWT in local storage

  return isAuthenticated ? <>{children}</> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
