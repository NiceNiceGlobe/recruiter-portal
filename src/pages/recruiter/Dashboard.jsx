import StatsRow from "../../components/dashboard/StatsRow";
import RecentActivity from "../../components/dashboard/RecentActivity";
import QuickActions from "../../components/dashboard/QuickActions";
import MonthlyPerformance from "../../components/dashboard/MonthlyPerformance";

export default function Dashboard() {
  return (
    <div>

      <StatsRow />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "24px",
          marginTop: "24px",
        }}
      >
        <RecentActivity />
        <QuickActions />
      </div>

      <div style={{ marginTop: "24px" }}>
        <MonthlyPerformance />
      </div>
    </div>
  );
}