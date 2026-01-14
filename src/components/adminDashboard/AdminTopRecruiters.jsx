export default function AdminTopRecruiters() {
  const recruiters = [
    { name: "John Recruiter", riders: 142, active: true },
    { name: "Sarah Johnson", riders: 98, active: true },
    { name: "Mike Williams", riders: 76, active: true },
    { name: "David Brown", riders: 63, active: true },
    { name: "Lisa Chen", riders: 45, active: false },
  ];

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
      </div>
    </div>
  );
}