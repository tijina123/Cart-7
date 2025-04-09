import React from 'react'
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const LoginProtectedRoute = () => {
      const {auth} = useAuth();
      const token = localStorage.getItem("accessToken");
    
      
      if (token) {
        
          return <Navigate to="/dashboard" />;
      }
    
  return (
    <Outlet />
  )
}

export default LoginProtectedRoute