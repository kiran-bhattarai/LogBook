import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";

const CheckVerified = ({ children }) => {
  const {  loading, accessToken } = useAuth();

  if (loading) return <div>Loading...</div>;
    
    if(accessToken && !jwtDecode(accessToken).verified) {
      return <Navigate to="/verify-email" replace />;
    }

  return children;
};

export default CheckVerified;