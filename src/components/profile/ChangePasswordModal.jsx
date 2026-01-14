import { useState } from "react";
import apiClient from "../../services/apiClient";

export default function ChangePasswordModal({ onClose }) {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    setError(null);

    if (!form.currentPassword || !form.newPassword)
      return setError("All fields are required.");

    if (form.newPassword !== form.confirmPassword)
      return setError("Passwords do not match.");

    setSubmitting(true);

    try {
      await apiClient.put("/recruiter/me/change-password", {
        currentPassword: form.currentPassword,
        newPassword: form.newPassword
      });

      setSuccess(true);

      setTimeout(() => {
        onClose();
      }, 1200);
    } catch (err) {
      setError(
        err.response?.data?.[0]?.description ||
        "Failed to change password."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="modal fade show d-block"
      style={{ background: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title">Change Password</h5>
            <button className="btn-close btn-close-white" onClick={onClose} />
          </div>

          <div className="modal-body">
            {error && (
              <div className="alert alert-danger">{error}</div>
            )}

            {success && (
              <div className="alert alert-success">
                Password changed successfully
              </div>
            )}

            <div className="mb-3">
              <label className="form-label">Current Password</label>
              <input
                type="password"
                className="form-control"
                value={form.currentPassword}
                onChange={e =>
                  setForm({ ...form, currentPassword: e.target.value })
                }
              />
            </div>

            <div className="mb-3">
              <label className="form-label">New Password</label>
              <input
                type="password"
                className="form-control"
                value={form.newPassword}
                onChange={e =>
                  setForm({ ...form, newPassword: e.target.value })
                }
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Confirm New Password</label>
              <input
                type="password"
                className="form-control"
                value={form.confirmPassword}
                onChange={e =>
                  setForm({ ...form, confirmPassword: e.target.value })
                }
              />
            </div>
          </div>

          <div className="modal-footer">
            <button
              className="btn btn-secondary"
              onClick={onClose}
              disabled={submitting}
            >
              Cancel
            </button>
            <button
              className="btn btn-primary"
              onClick={handleSubmit}
              disabled={submitting}
            >
              {submitting ? "Updating..." : "Change Password"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}