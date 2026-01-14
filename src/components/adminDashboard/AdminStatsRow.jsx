import { useEffect, useState } from "react";
import apiClient from "../../services/apiClient";

export default function AdminStatsRow() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    apiClient.get("/admin/dashboard").then(res => {
      setStats(res.data);
    });
  }, []);

  if (!stats) return null;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "16px",
      }}
    >
      <StatCard
        label="Total Submissions"
        value={stats.totalSubmissions}
        color="primary"
      />
      <StatCard
        label="Pending Review"
        value={stats.pendingReview}
        color="success"
      />
      <StatCard
        label="Total Riders"
        value={stats.totalRiders}
        color="warning"
      />
      <StatCard
        label="Active Recruiters"
        value={stats.totalRecruiters}
        color="info"
      />
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