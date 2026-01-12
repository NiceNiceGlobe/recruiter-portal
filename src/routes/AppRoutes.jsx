import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import Dashboard from "../pages/recruiter/Dashboard";
import UploadRiders from "../pages/recruiter/UploadRiders";
import MySubmissions from "../pages/recruiter/MySubmissions";
import MyRiders from "../pages/recruiter/MyRiders";
import Performance from "../pages/recruiter/Performance";
import MyProfile from "../pages/recruiter/MyProfile";
import Login from "../pages/auth/Login";
import ProtectedRoute from "../components/ProtectedRoute";
import SubmissionDetails from "../pages/recruiter/SubmissionDetails";

export default function AppRoutes() {
  const isLoggedIn = !!localStorage.getItem("user");

  return (
    <Routes>
      <Route
        path="/"
        element={
          isLoggedIn
            ? <Navigate to="/dashboard" replace />
            : <Navigate to="/login" replace />
        }
      />

      <Route path="/login" element={<Login />} />

      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/upload-riders" element={<UploadRiders />} />
        <Route path="/submissions" element={<MySubmissions />} />
        <Route path="/riders" element={<MyRiders />} />
        <Route path="/performance" element={<Performance />} />
        <Route path="/profile" element={<MyProfile />} />
        <Route path="/submissions/:id" element={<SubmissionDetails />} />
      </Route>
    </Routes>
  );
}