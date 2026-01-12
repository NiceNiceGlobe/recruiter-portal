export default function AdminSidebar({
  visible = false,
  onSwitchToRecruiter,
}) {
  return (
    <div
      className="sidebar admin-sidebar"
      id="adminSidebar"
      style={{ display: visible ? "block" : "none" }}
    >
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
          <a href="#" className="active">
            <i className="bi bi-speedometer2"></i>
            Admin Dashboard
          </a>
        </li>

        <li>
          <a href="#">
            <i className="bi bi-inbox"></i>
            All Submissions
            <span className="badge bg-light text-dark ms-auto">0</span>
          </a>
        </li>

        <li>
          <a href="#">
            <i className="bi bi-person-badge"></i>
            Recruiters
            <span className="badge bg-light text-dark ms-auto">0</span>
          </a>
        </li>

        <li>
          <a href="#">
            <i className="bi bi-people-fill"></i>
            All Riders
            <span className="badge bg-light text-dark ms-auto">0</span>
          </a>
        </li>

        <li>
          <a href="#">
            <i className="bi bi-bar-chart"></i>
            Reports &amp; Analytics
          </a>
        </li>

        <li>
          <a href="#">
            <i className="bi bi-gear"></i>
            System Settings
          </a>
        </li>

        <li className="mt-4">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onSwitchToRecruiter();
            }}
          >
            <i className="bi bi-arrow-left-circle"></i>
            Recruiter View
          </a>
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