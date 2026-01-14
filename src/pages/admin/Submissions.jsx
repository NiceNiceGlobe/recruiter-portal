import { useEffect, useState } from "react";
import apiClient from "../../services/apiClient";
import ReviewSubmissionModal from "../../components/admin/ReviewSubmissionModal";

export default function AdminSubmissions() {
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    apiClient.get("/admin/submissions").then(res => {
      const mapped = res.data.map(s => ({
        id: s.id,
        recruiter: s.recruiterName,
        file: s.fileName,
        riders: s.totalRiders,
        status: s.status,
        uploadDate: new Date(s.uploadedAt).toLocaleDateString(),
        reviewer: s.status === "Pending" ? "-" : "Admin",
        reviewDate: s.reviewedAt
          ? new Date(s.reviewedAt).toLocaleDateString()
          : "-"
      }));

      setSubmissions(mapped);
    });
  }, []);

  return (
    <>
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="mb-0">All Submissions</h5>

          <div className="d-flex gap-2">
            <input
              type="text"
              className="form-control"
              placeholder="Search submissions..."
              style={{ width: 250 }}
            />
            <select className="form-select" style={{ width: 150 }}>
              <option>All Status</option>
              <option>Pending</option>
              <option>Approved</option>
              <option>Rejected</option>
            </select>
          </div>
        </div>

        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead>
                <tr>
                  <th>Submission ID</th>
                  <th>Recruiter</th>
                  <th>File Name</th>
                  <th>Riders</th>
                  <th>Status</th>
                  <th>Upload Date</th>
                  <th>Reviewer</th>
                  <th>Review Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map(s => (
                  <tr key={s.id}>
                    <td>{s.id}</td>
                    <td>{s.recruiter}</td>
                    <td>{s.file}</td>
                    <td>{s.riders}</td>
                    <td>
                      <span className={`status-pill ${s.status.toLowerCase()}`}>
                        {s.status}
                      </span>
                    </td>
                    <td>{s.uploadDate}</td>
                    <td>{s.reviewer}</td>
                    <td>{s.reviewDate}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => setSelectedSubmission(s)}
                      >
                        Review
                      </button>
                    </td>
                  </tr>
                ))}

                {submissions.length === 0 && (
                  <tr>
                    <td colSpan="9" className="text-center text-muted py-3">
                      No submissions found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {selectedSubmission && (
        <ReviewSubmissionModal
          submission={selectedSubmission}
          onClose={() => setSelectedSubmission(null)}
        />
      )}
    </>
  );
}