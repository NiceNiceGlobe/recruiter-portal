import { useEffect, useState } from "react";
import apiClient from "../../services/apiClient";

export default function MyRiders() {
  const [riders, setRiders] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    loadRiders();
  }, []);

  const loadRiders = async () => {
    try {
      const res = await apiClient.get("/recruiter/my-riders");
      setRiders(res.data);
    } catch (err) {
      console.error("Failed to load riders", err);
    }
  };

  const filtered = riders.filter(r =>
    (!status || r.status.toLowerCase() === status) &&
    (
      r.fullName.toLowerCase().includes(search.toLowerCase()) ||
      r.phoneNumber.includes(search)
    )
  );

  return (
    <div className="view-content">
      <div className="row mb-4">
        <div className="col-12">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">
                <i className="bi bi-people me-2"></i>
                My Riders
              </h5>

              <div className="d-flex">
                <input
                  type="text"
                  className="form-control me-2"
                  placeholder="Search riders..."
                  style={{ width: "250px" }}
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />

                <select
                  className="form-select me-2"
                  style={{ width: "150px" }}
                  value={status}
                  onChange={e => setStatus(e.target.value)}
                >
                  <option value="">All Status</option>
                  <option value="approved">Approved</option>
                  <option value="pending">Pending</option>
                  <option value="rejected">Rejected</option>
                </select>

                <button className="btn btn-primary">
                  <i className="bi bi-download me-1"></i>
                  Export
                </button>
              </div>
            </div>

            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Full Name</th>
                      <th>Contact</th>
                      <th>City</th>
                      <th>Nationality</th>
                      <th>Submission</th>
                      <th>Status</th>
                      <th>Admin Notes</th>
                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filtered.map(r => (
                      <tr key={r.id}>
                        <td>{r.id.slice(0, 8).toUpperCase()}</td>
                        <td>{r.fullName}</td>
                        <td>{r.phoneNumber}</td>
                        <td>{r.city}</td>
                        <td>{r.nationality}</td>
                        <td>{r.submissionFile}</td>
                        <td>
                          <span
                            className={`badge ${
                              r.status === "Approved"
                                ? "badge-approved"
                                : r.status === "Pending"
                                ? "badge-pending"
                                : r.status === "Rejected"
                                ? "badge-rejected"
                                : r.status === "Deployed"
                                ? "badge-deployed"
                                : r.status === "Review"
                                ? "badge-review"
                                : ""
                            }`}
                          >
                            {r.status}
                          </span>
                        </td>
                        <td>{r.adminNotes || "-"}</td>
                        <td>
                          <button className="btn btn-sm btn-outline-primary">
                            View
                          </button>
                        </td>
                      </tr>
                    ))}

                    {filtered.length === 0 && (
                      <tr>
                        <td colSpan="9" className="text-center text-muted">
                          No riders found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}