import AdminStatsRow from "../../components/adminDashboard/AdminStatsRow";
import AdminRecentSubmissions from "../../components/adminDashboard/AdminRecentSubmissions";
import AdminTopRecruiters from "../../components/adminDashboard/AdminTopRecruiters";

export default function AdminDashboard() {
  return (
    <div>
      <AdminStatsRow />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "24px",
          marginTop: "24px",
        }}
      >
        <AdminRecentSubmissions />
        <AdminTopRecruiters />
      </div>
    </div>
  );
}