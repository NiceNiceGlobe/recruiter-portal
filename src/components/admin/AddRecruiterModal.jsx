import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import apiClient from "../../services/apiClient";

export default function AddRecruiterModal({ onClose, onSubmit }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [location, setLocation] = useState("");
  const [target, setTarget] = useState(100);
  const [password, setPassword] = useState("Password123");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleSubmit = async () => {
    if (!fullName || !email) return;

    const [firstName, ...rest] = fullName.trim().split(" ");
    const lastName = rest.join(" ");

    setSubmitting(true);

    await apiClient.post("/admin/recruiters", {
      firstName,
      lastName,
      email,
      phoneNumber,
      location,
      initialPassword: password
    });

    setSubmitting(false);
    onSubmit();
  };

  return createPortal(
    <div
      className="modal fade show d-block"
      style={{ background: "rgba(0,0,0,0.5)" }}
      onClick={onClose}
    >
      <div
        className="modal-dialog"
        onClick={e => e.stopPropagation()}
      >
        <div className="modal-content">
          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title">Add New Recruiter</h5>
            <button className="btn-close btn-close-white" onClick={onClose} />
          </div>

          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label className="form-label">Full Name *</label>
                <input
                  type="text"
                  className="form-control"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Email *</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Phone Number</label>
                <input
                  type="tel"
                  className="form-control"
                  value={phoneNumber}
                  onChange={e => setPhoneNumber(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Location</label>
                <input
                  type="text"
                  className="form-control"
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Monthly Target</label>
                <input
                  type="number"
                  className="form-control"
                  value={target}
                  onChange={e => setTarget(Number(e.target.value))}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Initial Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
                <small className="text-muted">
                  Recruiter will be asked to change password on first login
                </small>
              </div>
            </form>
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
              {submitting ? "Adding..." : "Add Recruiter"}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}