import { Navigate } from "react-router-dom";
import { useAuth } from "../context/RecruiterContext";

export default function ProtectedRoute({ children, role }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 🔐 Role-based enforcement
  if (role && !user.roles?.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}