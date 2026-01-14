import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/RecruiterContext";
import apiClient from "../../services/apiClient";

export default function RecruiterSidebar() {
  const { user } = useAuth();
  const [submissionCount, setSubmissionCount] = useState(0);
  const [riderCount, setRiderCount] = useState(0);

  const name = user?.name || "Recruiter";
  const role = user?.role || "Rider Recruiter";
  const recruiterCode = user?.recruiterCode || "—";
  const status = user?.status || "Active";

  useEffect(() => {
    loadSubmissionCount();
    loadRiderCount();
  }, []);

  const loadSubmissionCount = async () => {
    try {
      const res = await apiClient.get("/recruiter/my-submissions");
      setSubmissionCount(res.data.length);
    } catch {}
  };

  const loadRiderCount = async () => {
    try {
      const res = await apiClient.get("/recruiter/my-riders/count");
      setRiderCount(res.data.count);
    } catch {}
  };

  return (
    <div className="sidebar" id="recruiterSidebar">
      <div className="sidebar-header text-center">
        <div className="recruiter-avatar">
          <i className="bi bi-person-circle"></i>
        </div>

        <h5 className="mb-1">{name}</h5>
        <p className="text-white-50 mb-0">{role}</p>

        <div className="mt-3">
          <span className="badge bg-success">{status}</span>
          <small className="d-block mt-1">ID: {recruiterCode}</small>
        </div>
      </div>

      <ul className="sidebar-menu mt-4">
        <li>
          <NavLink to="/dashboard" end>
            <i className="bi bi-speedometer2"></i>
            Dashboard
          </NavLink>
        </li>

        <li>
          <NavLink to="/upload-riders">
            <i className="bi bi-cloud-upload"></i>
            Upload Riders
          </NavLink>
        </li>

        <li>
          <NavLink to="/submissions">
            <i className="bi bi-file-earmark-text"></i>
            My Submissions
            <span className="badge bg-light text-dark ms-auto">
              {submissionCount}
            </span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/riders">
            <i className="bi bi-people"></i>
            My Riders
            <span className="badge bg-light text-dark ms-auto">
              {riderCount}
            </span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/performance">
            <i className="bi bi-graph-up"></i>
            Performance
          </NavLink>
        </li>

        <li>
          <NavLink to="/profile">
            <i className="bi bi-person"></i>
            My Profile
          </NavLink>
        </li>
      </ul>

      <div className="sidebar-footer p-3 border-top border-white-10 mt-auto">
        <div className="d-flex align-items-center">
          <i className="bi bi-info-circle me-2"></i>
          <small>Last login: Today</small>
        </div>
      </div>
    </div>
  );
}