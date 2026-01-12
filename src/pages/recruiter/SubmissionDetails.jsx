import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiClient from "../../services/apiClient";

export default function SubmissionDetails() {
  const { id } = useParams();
  const [submission, setSubmission] = useState(null);

  useEffect(() => {
    loadSubmission();
  }, [id]);

  const loadSubmission = async () => {
    try {
      const res = await apiClient.get(`/recruiter/submissions/${id}`);
      setSubmission(res.data);
    } catch (err) {
      console.error("Failed to load submission", err);
    }
  };

  if (!submission) return <div>Loading...</div>;

  return (
    <div className="view-content">
      <h4>Submission Details</h4>

      <div className="card mt-3">
        <div className="card-body">
          <p><strong>File:</strong> {submission.fileName}</p>
          <p><strong>Total Riders:</strong> {submission.totalRiders}</p>
          <p><strong>Status:</strong> {submission.status}</p>
          <p><strong>Uploaded:</strong> {new Date(submission.uploadedAt).toLocaleDateString()}</p>
          <p><strong>Admin Feedback:</strong> {submission.adminFeedback || "None"}</p>
        </div>
      </div>
    </div>
  );
}