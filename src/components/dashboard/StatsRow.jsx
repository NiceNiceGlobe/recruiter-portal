import { useEffect, useState } from "react";
import StatCard from "./StatCard";
import apiClient from "../../services/apiClient";

export default function StatsRow() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    apiClient
      .get("/recruiter/performance/summary")
      .then((res) => setStats(res.data))
      .catch(() => {});
  }, []);

  if (!stats) return null;

  const total = stats.totalRidersSubmitted;
  const approved = Math.round((stats.approvalRate / 100) * total);
  const pending = total - approved;
  const monthlyTarget = 150;
  const progress = Math.min(
    Math.round((total / monthlyTarget) * 100),
    100
  );

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "24px",
        marginBottom: "24px",
      }}
    >
      <StatCard
        value={total}
        label="Total Riders Submitted"
      />

      <StatCard
        value={approved}
        label="Riders Approved"
        footer={`Approval Rate: ${stats.approvalRate}%`}
        color="success"
      />

      <StatCard
        value={pending}
        label="Pending Submissions"
        footer={`Avg. processing: ${stats.avgProcessingTime} days`}
        color="warning"
      />

      <StatCard
        value={monthlyTarget}
        label="Monthly Target"
        progress={progress}
        color="info"
      />
    </div>
  );
}