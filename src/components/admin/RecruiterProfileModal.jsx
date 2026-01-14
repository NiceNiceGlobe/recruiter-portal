import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import ResetPasswordModal from "../../components/admin/ResetPasswordModal";

export default function RecruiterProfileModal({ recruiter, onClose }) {
  const [showResetPassword, setShowResetPassword] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return createPortal(
    <>
      <div
        className="modal fade show d-block"
        style={{ background: "rgba(0,0,0,0.5)" }}
        onClick={onClose}
      >
        <div
          className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable"
          onClick={e => e.stopPropagation()}
        >
          <div className="modal-content">
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title">Recruiter Profile</h5>
              <button className="btn-close btn-close-white" onClick={onClose} />
            </div>

            <div className="modal-body">
              <div className="row">
                <div className="col-lg-4 mb-4">
                  <div className="card">
                    <div className="card-body text-center">
                      <div className="recruiter-avatar mx-auto mb-3">
                        <i className="bi bi-person-circle"></i>
                      </div>

                      <h4>{recruiter.name}</h4>
                      <p className="text-muted">Rider Recruiter</p>

                      <div className="mt-4">
                        <div className="d-flex justify-content-between mb-2">
                          <span className="text-muted">Recruiter ID:</span>
                          <span>{recruiter.code}</span>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                          <span className="text-muted">Status:</span>
                          <span
                            className={`badge ${
                              recruiter.active ? "bg-success" : "bg-secondary"
                            }`}
                          >
                            {recruiter.active ? "Active" : "Inactive"}
                          </span>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                          <span className="text-muted">Joined:</span>
                          <span>{recruiter.joined}</span>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                          <span className="text-muted">Last Active:</span>
                          <span>{recruiter.lastActive}</span>
                        </div>
                      </div>

                      <hr className="my-4" />

                      <button className="btn btn-outline-primary w-100 mb-2">
                        <i className="bi bi-pencil me-2"></i>
                        Edit Profile
                      </button>

                      <button
                        className="btn btn-outline-secondary w-100"
                        onClick={() => setShowResetPassword(true)}
                      >
                        <i className="bi bi-key me-2"></i>
                        Change Password
                      </button>
                    </div>
                  </div>
                </div>

                <div className="col-lg-8">
                  <div className="card mb-4">
                    <div className="card-header">
                      <h5 className="mb-0">Profile Information</h5>
                    </div>
                    <div className="card-body">
                      <form>
                        <div className="row">
                          <div className="col-md-6 mb-3">
                            <label className="form-label">Full Name</label>
                            <input
                              type="text"
                              className="form-control"
                              defaultValue={recruiter.name}
                            />
                          </div>
                          <div className="col-md-6 mb-3">
                            <label className="form-label">Email</label>
                            <input
                              type="email"
                              className="form-control"
                              defaultValue={recruiter.email}
                            />
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-6 mb-3">
                            <label className="form-label">Phone Number</label>
                            <input
                              type="tel"
                              className="form-control"
                              defaultValue={recruiter.phone}
                            />
                          </div>
                          <div className="col-md-6 mb-3">
                            <label className="form-label">Location</label>
                            <input
                              type="text"
                              className="form-control"
                              defaultValue={recruiter.location}
                            />
                          </div>
                        </div>

                        <div className="mb-3">
                          <label className="form-label">Bio</label>
                          <textarea
                            className="form-control"
                            rows={3}
                            defaultValue={recruiter.bio}
                          />
                        </div>

                        <button className="btn btn-primary">Update Profile</button>
                      </form>
                    </div>
                  </div>

                  <div className="card">
                    <div className="card-header">
                      <h5 className="mb-0">Account Settings</h5>
                    </div>
                    <div className="card-body">
                      <div className="mb-3">
                        <label className="form-label">Notification Preferences</label>

                        <div className="form-check mb-2">
                          <input className="form-check-input" type="checkbox" defaultChecked />
                          <label className="form-check-label">
                            Notify me when submissions are approved/rejected
                          </label>
                        </div>

                        <div className="form-check mb-2">
                          <input className="form-check-input" type="checkbox" defaultChecked />
                          <label className="form-check-label">
                            Send weekly performance report
                          </label>
                        </div>

                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" defaultChecked />
                          <label className="form-check-label">
                            Notify me about system updates
                          </label>
                        </div>
                      </div>

                      <hr className="my-4" />

                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h6 className="mb-1">Two-Factor Authentication</h6>
                          <p className="text-muted mb-0">
                            Add an extra layer of security to your account
                          </p>
                        </div>

                        <div className="form-check form-switch">
                          <input className="form-check-input" type="checkbox" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {showResetPassword && (
        <ResetPasswordModal
          recruiterId={recruiter.id}
          onClose={() => setShowResetPassword(false)}
          onSuccess={() => setShowResetPassword(false)}
        />
      )}
    </>,
    document.body
  );
}