import { useState } from "react";
import RecruiterProfileModal from "../../components/admin/RecruiterProfileModal";
import AddRecruiterModal from "../../components/admin/AddRecruiterModal";

export default function AdminRecruiters() {
  const [selectedRecruiter, setSelectedRecruiter] = useState(null);
  const [showAddRecruiter, setShowAddRecruiter] = useState(false);

  const recruiters = [
    {
      name: "John Recruiter",
      code: "REC-2025-001",
      riders: 142,
      target: 150,
      approval: 78,
      pending: 1,
      joined: "Jan 15, 2024",
      active: true,
    },
    {
      name: "Sarah Johnson",
      code: "REC-2025-002",
      riders: 98,
      target: 120,
      approval: 82,
      pending: 2,
      joined: "Mar 10, 2024",
      active: true,
    },
    {
      name: "Mike Williams",
      code: "REC-2025-003",
      riders: 76,
      target: 100,
      approval: 65,
      pending: 0,
      joined: "Feb 22, 2024",
      active: true,
    },
    {
      name: "Lisa Chen",
      code: "REC-2025-004",
      riders: 45,
      target: 80,
      approval: 72,
      pending: 0,
      joined: "Apr 5, 2024",
      active: false,
    },
    {
      name: "David Brown",
      code: "REC-2025-005",
      riders: 63,
      target: 90,
      approval: 88,
      pending: 1,
      joined: "May 18, 2024",
      active: true,
    },
  ];

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
                        onClick={() =>
                          setSelectedRecruiter({
                            ...r,
                            email: "john.recruiter@valtenative.com",
                            phone: "+27 11 123 4567",
                            location: "Johannesburg, South Africa",
                            bio:
                              "Experienced rider recruiter with 3+ years in the transportation industry. Specializing in Gauteng region recruitment.",
                            lastActive: "Today, 09:42 AM",
                          })
                        }
                      >
                        <i className="bi bi-eye"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
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