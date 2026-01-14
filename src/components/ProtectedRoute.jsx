import { Navigate } from "react-router-dom";
import { useAuth } from "../context/RecruiterContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (
    !user ||
    (
      !user.roles?.includes("Recruiter") &&
      !user.roles?.includes("Admin")
    )
  ) {
    return <Navigate to="/login" replace />;
  }

  return children;
}