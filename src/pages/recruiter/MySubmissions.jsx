import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import apiClient from "../../services/apiClient";

export default function MySubmissions() {
  const [submissions, setSubmissions] = useState([]);
  const [filter, setFilter] = useState("ALL");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadSubmissions();
  }, []);

  const loadSubmissions = async () => {
    try {
      const res = await apiClient.get("/recruiter/my-submissions");
      setSubmissions(res.data);
    } catch (err) {
      console.error("Failed to load submissions", err);
    }
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await apiClient.delete(`/recruiter/submissions/${deleteId}`);
      setSubmissions(prev => prev.filter(s => s.id !== deleteId));
    } catch (err) {
      console.error("Failed to delete submission", err);
      alert("Failed to delete submission");
    } finally {
      setShowDeleteModal(false);
      setDeleteId(null);
    }
  };

  const filtered = submissions.filter(s =>
    filter === "ALL" ? true : s.status === filter
  );

  const pendingCount = submissions.filter(s => s.status === "Pending").length;
  const approvedCount = submissions.filter(s => s.status === "Approved").length;

  return (
    <div className="view-content">
      <div className="row">
        <div className="col-12">
          <div className="card">

            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">
                <i className="bi bi-file-earmark-text me-2"></i>
                My Submissions
              </h5>

              <div>
                <button
                  className="btn btn-sm btn-outline-primary me-2"
                  onClick={() => setFilter("Pending")}
                >
                  Pending ({pendingCount})
                </button>

                <button
                  className="btn btn-sm btn-outline-success me-2"
                  onClick={() => setFilter("Approved")}
                >
                  Approved ({approvedCount})
                </button>

                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => setFilter("ALL")}
                >
                  Show All ({submissions.length})
                </button>
              </div>
            </div>

            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Submission ID</th>
                      <th>File Name</th>
                      <th>Upload Date</th>
                      <th>Riders</th>
                      <th>Status</th>
                      <th>Admin Reviewer</th>
                      <th>Review Date</th>
                      <th>Feedback</th>
                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filtered.map(s => (
                      <tr key={s.id}>
                        <td>{s.id.slice(0, 8).toUpperCase()}</td>
                        <td>{s.fileName}</td>
                        <td>{new Date(s.uploadedAt).toLocaleDateString()}</td>
                        <td>{s.totalRiders}</td>
                        <td>
                          <span
                            className={`badge ${
                              s.status === "Approved"
                                ? "badge-approved"
                                : s.status === "Pending"
                                ? "badge-pending"
                                : s.status === "Rejected"
                                ? "badge-rejected"
                                : s.status === "Review"
                                ? "badge-review"
                                : ""
                            }`}
                          >
                            {s.status}
                          </span>
                        </td>
                        <td>-</td>
                        <td>
                          {s.reviewedAt
                            ? new Date(s.reviewedAt).toLocaleDateString()
                            : "-"}
                        </td>
                        <td>{s.adminFeedback || "No feedback yet"}</td>
                        <td>
                          <div className="dropdown">
                            <button
                              className="btn btn-sm btn-outline-primary dropdown-toggle"
                              type="button"
                              data-bs-toggle="dropdown"
                            >
                              View
                            </button>
                            <ul className="dropdown-menu">
                              <li>
                                <button
                                  className="dropdown-item"
                                  onClick={() => navigate(`/submissions/${s.id}`)}
                                >
                                  View Submission
                                </button>
                              </li>
                              <li>
                                <button
                                  className="dropdown-item text-danger"
                                  onClick={() => handleDeleteClick(s.id)}
                                >
                                  Delete Submission
                                </button>
                              </li>
                            </ul>
                          </div>
                        </td>
                      </tr>
                    ))}

                    {filtered.length === 0 && (
                      <tr>
                        <td colSpan="9" className="text-center text-muted">
                          No submissions found
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

      {showDeleteModal &&
        createPortal(
          <>
            <div className="modal fade show d-block" tabIndex="-1">
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Delete Submission</h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setShowDeleteModal(false)}
                    ></button>
                  </div>

                  <div className="modal-body">
                    <p>Are you sure you want to delete this submission?</p>
                    <p className="text-muted mb-0">This action cannot be undone.</p>
                  </div>

                  <div className="modal-footer">
                    <button
                      className="btn btn-outline-secondary"
                      onClick={() => setShowDeleteModal(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={confirmDelete}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-backdrop fade show"></div>
          </>,
          document.body
        )
      }

    </div>
  );
}