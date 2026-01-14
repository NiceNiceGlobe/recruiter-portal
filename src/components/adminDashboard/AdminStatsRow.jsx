export default function AdminStatsRow() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "16px",
      }}
    >
      <StatCard label="Total Submissions" value={5} color="primary" />
      <StatCard label="Pending Review" value={2} color="success" />
      <StatCard label="Total Riders" value={50} color="warning" />
      <StatCard label="Active Recruiters" value={4} color="info" />
    </div>
  );
}

function StatCard({ label, value, color }) {
  return (
    <div className={`card stats-card ${color}`}>
      <div className="card-body">
        <div className="stats-number">{value}</div>
        <div className="stats-label">{label}</div>
      </div>
    </div>
  );
}