import { useEffect, useState } from "react";
import apiClient from "../../services/apiClient";

export default function RecentActivity() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    apiClient
      .get("/recruiter/my-submissions")
      .then((res) => {
        setActivities(res.data.slice(0, 5));
      })
      .catch(() => {});
  }, []);

  const getBadgeClass = (status) => {
    if (status === "Approved") return "badge badge-approved";
    if (status === "Pending") return "badge badge-pending";
    if (status === "Rejected") return "badge badge-rejected";
    if (status === "Deployed") return "badge badge-deployed";
    if (status === "Review") return "badge badge-review";
    return "badge";
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-ZA", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h6 className="mb-0">Recent Activity</h6>
        <button className="btn btn-outline-primary btn-sm">
          View All
        </button>
      </div>

      <div className="table-responsive">
        <table className="table table-hover mb-0">
          <thead>
            <tr>
              <th>Date</th>
              <th>Activity</th>
              <th>Details</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {activities.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center text-muted">
                  No recent activity
                </td>
              </tr>
            )}

            {activities.map((item) => (
              <tr key={item.id}>
                <td>{formatDate(item.uploadedAt)}</td>
                <td>File uploaded: {item.fileName}</td>
                <td>{item.totalRiders} riders</td>
                <td>
                  <span className={getBadgeClass(item.status)}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}