import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/RecruiterContext";
import MainLayout from "../components/layout/MainLayout";
import Dashboard from "../pages/recruiter/Dashboard";
import UploadRiders from "../pages/recruiter/UploadRiders";
import MySubmissions from "../pages/recruiter/MySubmissions";
import MyRiders from "../pages/recruiter/MyRiders";
import Performance from "../pages/recruiter/Performance";
import MyProfile from "../pages/recruiter/MyProfile";
import SubmissionDetails from "../pages/recruiter/SubmissionDetails";
import AdminDashboard from "../pages/admin/Dashboard";
import AdminSubmissions from "../pages/admin/Submissions";
import AdminRecruiters from "../pages/admin/Recruiters";
import AdminRiders from "../pages/admin/Riders";
import AdminReports from "../pages/admin/Reports";
import AdminSettings from "../pages/admin/Settings";
import Login from "../pages/auth/Login";
import ProtectedRoute from "../components/ProtectedRoute";

export default function AppRoutes() {
  const { user, loading } = useAuth();
  const isLoggedIn = !!user;

  if (loading) return null;

  return (
    <Routes>

      {/* ROOT */}
      <Route
        path="/"
        element={
          isLoggedIn ? (
            user.roles?.includes("Admin") ? (
              <Navigate to="/admin/dashboard" replace />
            ) : (
              <Navigate to="/dashboard" replace />
            )
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      <Route path="/login" element={<Login />} />

      {/* ADMIN ROUTES */}
      <Route
        element={
          <ProtectedRoute role="Admin">
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/submissions" element={<AdminSubmissions />} />
        <Route path="/admin/recruiters" element={<AdminRecruiters />} />
        <Route path="/admin/riders" element={<AdminRiders />} />
        <Route path="/admin/reports" element={<AdminReports />} />
        <Route path="/admin/settings" element={<AdminSettings />} />
      </Route>

      {/* RECRUITER ROUTES */}
      <Route
        element={
          <ProtectedRoute role="Recruiter">
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