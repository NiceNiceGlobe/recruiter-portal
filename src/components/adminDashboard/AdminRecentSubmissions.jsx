import { useEffect, useState } from "react";
import apiClient from "../../services/apiClient";

export default function AdminRecentSubmissions() {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    apiClient.get("/admin/submissions").then(res => {
      setSubmissions(res.data);
    });
  }, []);

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between">
        <h5 className="mb-0">Recent Submissions</h5>
        <button className="btn btn-sm btn-outline-primary">View All</button>
      </div>

      <div className="card-body">
        <table className="table table-hover align-middle">
          <thead>
            <tr>
              <th>Submission ID</th>
              <th>Recruiter</th>
              <th>File</th>
              <th>Riders</th>
              <th>Status</th>
              <th>Upload Date</th>
            </tr>
          </thead>
          <tbody>
            {submissions.slice(0, 5).map(s => (
              <tr key={s.id}>
                <td>{s.id.slice(0, 8).toUpperCase()}</td>
                <td>{s.recruiterName}</td>
                <td>{s.fileName}</td>
                <td>{s.totalRiders}</td>
                <td>
                  <span className={`status-pill ${s.status.toLowerCase()}`}>
                    {s.status}
                  </span>
                </td>
                <td>
                  {new Date(s.uploadedAt).toLocaleDateString()}
                </td>
              </tr>
            ))}

            {submissions.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center text-muted">
                  No submissions found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}