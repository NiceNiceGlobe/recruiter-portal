import { useEffect, useState } from "react";
import apiClient from "../../services/apiClient";

export default function MyProfile() {
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({
    phoneNumber: ""
  });

  const [notifications, setNotifications] = useState({
    submissionStatusUpdates: true,
    weeklyPerformanceReport: true,
    systemUpdates: true
  });

  useEffect(() => {
    apiClient.get("/recruiter/me").then(res => {
      setProfile(res.data);
      setForm({
        phoneNumber: res.data.phoneNumber || ""
      });
    });

    apiClient.get("/recruiter/notifications/settings").then(res => {
      setNotifications({
        submissionStatusUpdates: res.data.submissionStatusUpdates,
        weeklyPerformanceReport: res.data.weeklyPerformanceReport,
        systemUpdates: res.data.systemUpdates
      });
    });
  }, []);

  const handleUpdate = async () => {
    await apiClient.put("/recruiter/me", form);
    await apiClient.put("/recruiter/notifications/settings", notifications);
    const res = await apiClient.get("/recruiter/me");
    setProfile(res.data);
  };

  if (!profile) return null;

  return (
    <div className="view-content">
      <div className="row">
        <div className="col-lg-4 mb-4">
          <div className="card">
            <div className="card-body text-center">
              <div className="recruiter-avatar mx-auto mb-3">
                <i className="bi bi-person-circle"></i>
              </div>

              <h4>{profile.name}</h4>
              <p className="text-muted">{profile.role}</p>

              <div className="mt-4">
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Recruiter ID:</span>
                  <span>{profile.recruiterCode}</span>
                </div>

                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Status:</span>
                  <span className="badge badge-approved">{profile.status}</span>
                </div>

                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Joined:</span>
                  <span>{new Date(profile.joinedAt).toLocaleDateString()}</span>
                </div>

                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Last Active:</span>
                  <span>Today</span>
                </div>
              </div>

              <hr className="my-4" />

              <button className="btn btn-outline-primary w-100 mb-2">
                <i className="bi bi-pencil me-2"></i>
                Edit Profile
              </button>

              <button className="btn btn-outline-secondary w-100">
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
                      value={profile.name}
                      readOnly
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      value={profile.email}
                      readOnly
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Phone Number</label>
                    <input
                      type="tel"
                      className="form-control"
                      value={form.phoneNumber}
                      onChange={e =>
                        setForm({ phoneNumber: e.target.value })
                      }
                    />
                  </div>
                </div>

                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleUpdate}
                >
                  Update Profile
                </button>
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
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={notifications.submissionStatusUpdates}
                    onChange={e =>
                      setNotifications({
                        ...notifications,
                        submissionStatusUpdates: e.target.checked
                      })
                    }
                  />
                  <label className="form-check-label">
                    Notify me when submissions are approved/rejected
                  </label>
                </div>

                <div className="form-check mb-2">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={notifications.weeklyPerformanceReport}
                    onChange={e =>
                      setNotifications({
                        ...notifications,
                        weeklyPerformanceReport: e.target.checked
                      })
                    }
                  />
                  <label className="form-check-label">
                    Send weekly performance report
                  </label>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={notifications.systemUpdates}
                    onChange={e =>
                      setNotifications({
                        ...notifications,
                        systemUpdates: e.target.checked
                      })
                    }
                  />
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
  );
}