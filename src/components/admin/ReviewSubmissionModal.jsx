import { useState } from "react";
import apiClient from "../../services/apiClient";

export default function ReviewSubmissionModal({ submission, onClose, onReviewed }) {
  const [status, setStatus] = useState(submission.status);
  const [feedback, setFeedback] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    setSubmitting(true);

    await apiClient.put(`/admin/submissions/${submission.id}/review`, {
      status,
      adminFeedback: feedback
    });

    setSubmitting(false);
    onReviewed();
    onClose();
  };

  return (
    <div
      className="modal fade show d-block"
      style={{ background: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title">Review Submission</h5>
            <button className="btn-close btn-close-white" onClick={onClose} />
          </div>

          <div className="modal-body">
            <h6>Submission Details</h6>

            <div className="row mb-3">
              <div className="col-md-6">
                <p><strong>Submission ID:</strong> {submission.id}</p>
                <p><strong>Recruiter:</strong> {submission.recruiter}</p>
                <p><strong>File Name:</strong> {submission.file}</p>
              </div>

              <div className="col-md-6">
                <p><strong>Upload Date:</strong> {submission.uploadDate}</p>
                <p><strong>Riders Count:</strong> {submission.riders}</p>
                <p>
                  <strong>Current Status:</strong>{" "}
                  <span className={`status-pill ${submission.status.toLowerCase()}`}>
                    {submission.status}
                  </span>
                </p>
              </div>
            </div>

            <hr />

            <h6>Admin Review</h6>

            <div className="mb-3">
              <label className="form-label">Status</label>
              <select
                className="form-select"
                value={status}
                onChange={e => setStatus(e.target.value)}
              >
                <option>Pending</option>
                <option>Approved</option>
                <option>Rejected</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Feedback / Notes</label>
              <textarea
                className="form-control"
                rows={3}
                value={feedback}
                onChange={e => setFeedback(e.target.value)}
                placeholder="Provide feedback to the recruiter..."
              />
            </div>
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button
              className="btn btn-primary"
              onClick={handleSubmit}
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "Submit Review"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}