import { useEffect, useState } from "react";
import apiClient from "../../services/apiClient";

export default function AdminTopRecruiters() {
  const [recruiters, setRecruiters] = useState([]);

  useEffect(() => {
    apiClient.get("/admin/recruiters/top").then(res => {
      setRecruiters(res.data);
    });
  }, []);

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5 className="mb-0">Top Recruiters</h5>
        <button className="btn btn-sm btn-outline-primary">View All</button>
      </div>

      <div className="card-body">
        {recruiters
          .sort((a, b) => b.riders - a.riders)
          .slice(0, 5)
          .map(r => (
            <div
              key={r.name}
              className="d-flex justify-content-between align-items-center py-2 border-bottom"
            >
              <div>
                <div className="fw-semibold">{r.name}</div>
                <div className="text-muted small">{r.riders} riders</div>
              </div>

              <span
                className={`badge rounded-pill ${
                  r.active ? "bg-success" : "bg-secondary"
                }`}
              >
                {r.active ? "active" : "inactive"}
              </span>
            </div>
          ))}

        {recruiters.length === 0 && (
          <div className="text-center text-muted py-3">
            No recruiter data available
          </div>
        )}
      </div>
    </div>
  );
}