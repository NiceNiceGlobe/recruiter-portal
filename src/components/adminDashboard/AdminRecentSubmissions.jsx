export default function AdminRecentSubmissions() {
  const submissions = [
    {
      id: "SUB-004",
      recruiter: "Sarah Johnson",
      file: "joburg_riders.csv",
      riders: 22,
      status: "Pending",
      date: "Dec 2, 2024",
    },
    {
      id: "SUB-002",
      recruiter: "John Recruiter",
      file: "december_riders.xlsx",
      riders: 18,
      status: "Pending",
      date: "Dec 1, 2024",
    },
    {
      id: "SUB-005",
      recruiter: "Mike Williams",
      file: "pretoria_riders.xlsx",
      riders: 15,
      status: "Rejected",
      date: "Nov 30, 2024",
    },
  ];

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between">
        <h5 className="mb-0">Recent Submissions</h5>
        <button className="btn btn-sm btn-outline-primary">View All</button>
      </div>

      <div className="card-body">
        <table className="table table-hover align-middle">
          <thead>
            <tr>
              <th>Submission ID</th>
              <th>Recruiter</th>
              <th>File</th>
              <th>Riders</th>
              <th>Status</th>
              <th>Upload Date</th>
            </tr>
          </thead>
          <tbody>
            {submissions.slice(0, 5).map(s => (
              <tr key={s.id}>
                <td>{s.id}</td>
                <td>{s.recruiter}</td>
                <td>{s.file}</td>
                <td>{s.riders}</td>
                <td>
                  <span
                    className={`status-pill ${s.status.toLowerCase()}`}
                  >
                    {s.status}
                  </span>
                </td>
                <td>{s.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}