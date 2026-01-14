import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../../services/apiClient";
import { useAuth } from "../../context/RecruiterContext";

export default function Navbar({ onToggleSidebar }) {
  const navigate = useNavigate();
  const { user, clearUser } = useAuth();

  const [notifications, setNotifications] = useState([]);

  const userName = user?.name || user?.fullName || "User";
  const userRole = user?.role;

  const loadNotifications = async () => {
    if (!user) return;

    try {
      if (userRole === "Recruiter") {
        const res = await apiClient.get("/recruiter/dashboard");
        setNotifications(res.data.recentActivity || []);
      } else {
        const res = await apiClient.get("/admin/notifications");
        setNotifications(res.data.recentActivity || []);
      }
    } catch (err) {
      console.error("Failed to load notifications", err);
      setNotifications([]);
    }
  };

  useEffect(() => {
    loadNotifications();

    const handleFocus = () => loadNotifications();
    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, [user]);

  const handleLogout = async () => {
    try {
      await apiClient.post("/Account/logout");
    } finally {
      clearUser();
      localStorage.removeItem("user");
      navigate("/login", { replace: true });
    }
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <button className="btn sidebar-toggle me-2" onClick={onToggleSidebar}>
          <i className="bi bi-list"></i>
        </button>

        <a className="navbar-brand fw-bold text-primary" href="#">
          <i className="bi bi-bicycle me-2"></i>
          Valternative Rider Recruitment
        </a>

        <div className="ms-auto d-flex align-items-center">
          <div className="dropdown me-3">
            <button
              className="btn btn-outline-primary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
            >
              <i className="bi bi-bell"></i>
              {notifications.length > 0 && (
                <span className="badge bg-danger rounded-pill ms-1">
                  {notifications.length}
                </span>
              )}
            </button>

            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <h6 className="dropdown-header">Notifications</h6>
              </li>

              {notifications.length === 0 && (
                <li className="dropdown-item text-muted">
                  No recent activity
                </li>
              )}

              {notifications.map((n, i) => (
                <li key={i}>
                  <span className="dropdown-item">
                    <i
                      className={`bi ${
                        n.status === "Approved"
                          ? "bi-check-circle text-success"
                          : "bi-clock text-warning"
                      } me-2`}
                    ></i>
                    {n.status === "Approved"
                      ? "Submission approved:"
                      : "Submission uploaded:"}{" "}
                    <strong>{n.fileName}</strong>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="dropdown">
            <button
              className="btn btn-light dropdown-toggle d-flex align-items-center"
              type="button"
              data-bs-toggle="dropdown"
            >
              <div className="me-2 text-start">
                <strong>{userName}</strong>
                <small className="d-block text-muted">
                  {userRole || "Administrator"}
                </small>
              </div>
              <i className="bi bi-person-circle fs-4"></i>
            </button>

            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <h6 className="dropdown-header">{userName}</h6>
              </li>
              <li>
                <button
                  className="dropdown-item text-danger"
                  onClick={handleLogout}
                >
                  <i className="bi bi-box-arrow-right me-2"></i>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}