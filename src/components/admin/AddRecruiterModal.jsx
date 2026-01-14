import { useEffect } from "react";
import { createPortal } from "react-dom";

export default function AddRecruiterModal({ onClose, onSubmit }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

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
                <input type="text" className="form-control" required />
              </div>

              <div className="mb-3">
                <label className="form-label">Email *</label>
                <input type="email" className="form-control" required />
              </div>

              <div className="mb-3">
                <label className="form-label">Phone Number</label>
                <input type="tel" className="form-control" />
              </div>

              <div className="mb-3">
                <label className="form-label">Location</label>
                <input type="text" className="form-control" />
              </div>

              <div className="mb-3">
                <label className="form-label">Monthly Target</label>
                <input type="number" className="form-control" defaultValue={100} />
              </div>

              <div className="mb-3">
                <label className="form-label">Initial Password</label>
                <input
                  type="password"
                  className="form-control"
                  defaultValue="Password123"
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
            <button className="btn btn-primary" onClick={onSubmit}>
              Add Recruiter
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}