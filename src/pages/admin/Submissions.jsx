import { useState } from "react";
import ReviewSubmissionModal from "../../components/admin/ReviewSubmissionModal";

export default function AdminSubmissions() {
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  const submissions = [
    {
      id: "SUB-004",
      recruiter: "Sarah Johnson",
      file: "joburg_riders.csv",
      riders: 22,
      status: "Pending",
      uploadDate: "Dec 2, 2024",
      reviewer: "-",
      reviewDate: "-",
    },
    {
      id: "SUB-002",
      recruiter: "John Recruiter",
      file: "december_riders.xlsx",
      riders: 18,
      status: "Pending",
      uploadDate: "Dec 1, 2024",
      reviewer: "-",
      reviewDate: "-",
    },
    {
      id: "SUB-005",
      recruiter: "Mike Williams",
      file: "pretoria_riders.xlsx",
      riders: 15,
      status: "Rejected",
      uploadDate: "Nov 30, 2024",
      reviewer: "Admin User",
      reviewDate: "Dec 1, 2024",
    },
    {
      id: "SUB-001",
      recruiter: "John Recruiter",
      file: "riders_nov.csv",
      riders: 25,
      status: "Approved",
      uploadDate: "Nov 28, 2024",
      reviewer: "Admin User",
      reviewDate: "Nov 30, 2024",
    },
    {
      id: "SUB-003",
      recruiter: "John Recruiter",
      file: "gauteng_riders.csv",
      riders: 32,
      status: "Approved",
      uploadDate: "Oct 15, 2024",
      reviewer: "Admin User",
      reviewDate: "Oct 17, 2024",
    },
  ];

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