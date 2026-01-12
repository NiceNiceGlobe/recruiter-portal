import { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import apiClient from "../../services/apiClient";

export default function Performance() {
  const [summary, setSummary] = useState({
    totalRidersSubmitted: 0,
    approvalRate: 0,
    avgProcessingTime: 0,
  });

  useEffect(() => {
    let performanceChart;
    let citiesChart;
    let statusChart;

    const loadData = async () => {
      const summaryRes = await apiClient.get("/recruiter/performance/summary");
      setSummary(summaryRes.data);

      const monthlyRes = await apiClient.get("/recruiter/performance/monthly");

      performanceChart = new Chart(
        document.getElementById("detailedPerformanceChart"),
        {
          type: "bar",
          data: {
            labels: monthlyRes.data.map(x => x.month),
            datasets: [
              {
                label: "Riders Submitted",
                data: monthlyRes.data.map(x => x.riders),
                backgroundColor: "#1a73e8",
              },
              {
                label: "Riders Approved",
                data: monthlyRes.data.map(x => x.submissions),
                backgroundColor: "#34a853",
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
          },
        }
      );

      const citiesRes = await apiClient.get("/recruiter/performance/cities");

      citiesChart = new Chart(
        document.getElementById("citiesChart"),
        {
          type: "doughnut",
          data: {
            labels: citiesRes.data.map(x => x.city),
            datasets: [
              {
                data: citiesRes.data.map(x => x.count),
                backgroundColor: [
                  "#1a73e8",
                  "#4285f4",
                  "#34a853",
                  "#fbbc05",
                  "#ea4335",
                ],
              },
            ],
          },
          options: {
            cutout: "60%",
          },
        }
      );

      const statusRes = await apiClient.get("/recruiter/performance/status-distribution");

      statusChart = new Chart(
        document.getElementById("statusChart"),
        {
          type: "pie",
          data: {
            labels: statusRes.data.map(x => x.status),
            datasets: [
              {
                data: statusRes.data.map(x => x.count),
                backgroundColor: ["#34a853", "#fbbc05", "#ea4335"],
              },
            ],
          },
        }
      );
    };

    loadData();

    return () => {
      performanceChart?.destroy();
      citiesChart?.destroy();
      statusChart?.destroy();
    };
  }, []);

  return (
    <div className="view-content">
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">
                <i className="bi bi-graph-up me-2"></i>
                Performance Analytics
              </h5>
            </div>

            <div className="card-body">
              <div className="row mb-5">
                <div className="col-md-8">
                  <canvas id="detailedPerformanceChart" height="300"></canvas>
                </div>

                <div className="col-md-4">
                  <h6 className="mb-4">Performance Summary</h6>

                  <div className="mb-4">
                    <small className="text-muted d-block">
                      Total Riders Submitted
                    </small>
                    <h3>{summary.totalRidersSubmitted}</h3>
                  </div>

                  <div className="mb-4">
                    <small className="text-muted d-block">
                      Approval Rate
                    </small>
                    <h3>{summary.approvalRate}%</h3>
                  </div>

                  <div className="mb-4">
                    <small className="text-muted d-block">
                      Avg. Processing Time
                    </small>
                    <h3>{summary.avgProcessingTime.toFixed(1)} days</h3>
                  </div>

                  <div className="mb-4">
                    <small className="text-muted d-block">
                      Monthly Target Progress
                    </small>
                    <h3>33%</h3>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-4">
                  <div className="card">
                    <div className="card-header">
                      <h6 className="mb-0">Top Cities</h6>
                    </div>
                    <div className="card-body">
                      <canvas id="citiesChart" height="200"></canvas>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 mb-4">
                  <div className="card">
                    <div className="card-header">
                      <h6 className="mb-0">Status Distribution</h6>
                    </div>
                    <div className="card-body">
                      <canvas id="statusChart" height="200"></canvas>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}