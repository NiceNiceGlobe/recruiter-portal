import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import apiClient from "../../services/apiClient";

export default function ResetPasswordModal({ recruiterId, onClose, onSuccess }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleSubmit = async () => {
    if (!password || password !== confirmPassword) return;

    setSubmitting(true);

    await apiClient.post(
      `/admin/recruiters/${recruiterId}/reset-password`,
      { newPassword: password }
    );

    setSubmitting(false);
    onSuccess();
  };

  return createPortal(
    <div
      className="modal fade show d-block"
      style={{ background: "rgba(0,0,0,0.5)" }}
      onClick={onClose}
    >
      <div
        className="modal-dialog modal-dialog-centered"
        onClick={e => e.stopPropagation()}
      >
        <div className="modal-content">
          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title">Reset Recruiter Password</h5>
            <button className="btn-close btn-close-white" onClick={onClose} />
          </div>

          <div className="modal-body">
            <div className="mb-3">
              <label className="form-label">New Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
              />
            </div>

            {password && confirmPassword && password !== confirmPassword && (
              <div className="text-danger small">
                Passwords do not match
              </div>
            )}
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button
              className="btn btn-primary"
              onClick={handleSubmit}
              disabled={submitting || !password || password !== confirmPassword}
            >
              {submitting ? "Resetting..." : "Reset Password"}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}