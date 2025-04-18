import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  user: any;
  role: string;
  requiredRole: string;
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  user,
  role,
  requiredRole,
  children,
}) => {
  if (!user) return <Navigate to="/login" />;
  if (role !== requiredRole) return <Navigate to="/" />;
  return children;
};

export default ProtectedRoute;
