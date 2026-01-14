import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import apiClient from "../../services/apiClient";

export default function AdminSidebar() {
  const [counts, setCounts] = useState({
    submissions: 0,
    recruiters: 0,
    riders: 0,
  });

  useEffect(() => {
    loadCounts();
  }, []);

  const loadCounts = async () => {
    try {
      const res = await apiClient.get("/admin/sidebar-counts");
      setCounts(res.data);
    } catch (err) {
      console.error("Failed to load sidebar counts", err);
    }
  };

  return (
    <div className="sidebar admin-sidebar" id="adminSidebar">
      <div className="sidebar-header text-center">
        <div className="recruiter-avatar bg-warning">
          <i className="bi bi-shield-check text-dark"></i>
        </div>

        <h5 className="mb-1">Admin User</h5>
        <p className="text-white-50 mb-0">Valtenative Administrator</p>

        <div className="mt-3">
          <span className="badge bg-info">Administrator</span>
          <small className="d-block mt-1">ID: ADMIN-001</small>
        </div>
      </div>

      <ul className="sidebar-menu mt-4">
        <li>
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <i className="bi bi-speedometer2"></i>
            Admin Dashboard
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/admin/submissions"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <i className="bi bi-inbox"></i>
            All Submissions
            <span className="badge bg-light text-dark ms-auto">
              {counts.submissions}
            </span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/admin/recruiters">
            <i className="bi bi-person-badge"></i>
            Recruiters
            <span className="badge bg-light text-dark ms-auto">
              {counts.recruiters}
            </span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/admin/riders">
            <i className="bi bi-people-fill"></i>
            All Riders
            <span className="badge bg-light text-dark ms-auto">
              {counts.riders}
            </span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/admin/reports">
            <i className="bi bi-bar-chart"></i>
            Reports &amp; Analytics
          </NavLink>
        </li>

        <li>
          <NavLink to="/admin/settings">
            <i className="bi bi-gear"></i>
            System Settings
          </NavLink>
        </li>
      </ul>

      <div className="sidebar-footer p-3 border-top border-white-10 mt-auto">
        <div className="d-flex align-items-center">
          <i className="bi bi-server me-2"></i>
          <small>
            System Status: <span className="text-success">Online</span>
          </small>
        </div>
      </div>
    </div>
  );
}