import { useEffect, useState } from "react";
import apiClient from "../../services/apiClient";
import RecruiterProfileModal from "../../components/admin/RecruiterProfileModal";
import AddRecruiterModal from "../../components/admin/AddRecruiterModal";

export default function AdminRecruiters() {
  const [selectedRecruiter, setSelectedRecruiter] = useState(null);
  const [showAddRecruiter, setShowAddRecruiter] = useState(false);
  const [recruiters, setRecruiters] = useState([]);

  useEffect(() => {
    apiClient.get("/admin/recruiters").then(res => {
      const mapped = res.data.map(r => ({
        id: r.id,
        name: r.name,
        code: r.recruiterCode,
        riders: r.totalRiders,
        target: 100,
        approval: 0,
        pending: 0,
        joined: new Date(r.joinedAt).toLocaleDateString(),
        active: r.status === "Active"
      }));

      setRecruiters(mapped);
    });
  }, []);

  const openRecruiterProfile = async recruiter => {
    const res = await apiClient.get(`/admin/recruiters/${recruiter.id}`);

    setSelectedRecruiter({
      ...recruiter,
      email: res.data.email,
      phone: res.data.phoneNumber,
      location: "South Africa",
      bio: "Recruiter profile",
      lastActive: res.data.lastActive
    });
  };

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5 className="mb-0">
          <i className="bi bi-person-badge me-2"></i>
          Recruiters Management
        </h5>

        <button
          className="btn btn-primary"
          onClick={() => setShowAddRecruiter(true)}
        >
          <i className="bi bi-plus-circle me-1"></i>
          Add Recruiter
        </button>
      </div>

      <div className="card-body">
        <div className="row g-4">
          {recruiters.map(r => {
            const progress = Math.min(
              Math.round((r.riders / r.target) * 100),
              100
            );

            return (
              <div className="col-xl-4 col-lg-6" key={r.code}>
                <div className="card recruiter-card h-100">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <div>
                        <h5 className="mb-1">{r.name}</h5>
                        <small className="text-muted">{r.code}</small>
                      </div>

                      <span
                        className={`status-dot ${
                          r.active ? "active" : "inactive"
                        }`}
                      />
                    </div>

                    <div className="mb-2">
                      <small className="text-muted">Monthly Target</small>
                      <div className="d-flex justify-content-between">
                        <small>
                          {r.riders}/{r.target}
                        </small>
                      </div>
                      <div className="progress mt-1" style={{ height: 6 }}>
                        <div
                          className="progress-bar bg-primary"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>

                    <div className="row text-center mt-3">
                      <div className="col">
                        <h6 className="mb-0">{r.riders}</h6>
                        <small className="text-muted">Riders</small>
                      </div>
                      <div className="col">
                        <h6 className="mb-0">{r.approval}%</h6>
                        <small className="text-muted">Approval</small>
                      </div>
                      <div className="col">
                        <h6 className="mb-0">{r.pending}</h6>
                        <small className="text-muted">Pending</small>
                      </div>
                    </div>

                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <small className="text-muted">
                        Joined: {r.joined}
                      </small>

                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => openRecruiterProfile(r)}
                      >
                        <i className="bi bi-eye"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {recruiters.length === 0 && (
            <div className="text-center text-muted py-4">
              No recruiters found
            </div>
          )}
        </div>
      </div>

      {selectedRecruiter && (
        <RecruiterProfileModal
          recruiter={selectedRecruiter}
          onClose={() => setSelectedRecruiter(null)}
        />
      )}

      {showAddRecruiter && (
        <AddRecruiterModal
          onClose={() => setShowAddRecruiter(false)}
          onSubmit={() => setShowAddRecruiter(false)}
        />
      )}
    </div>
  );
}