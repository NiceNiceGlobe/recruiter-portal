import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";
import apiClient from "../../services/apiClient";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

export default function MonthlyPerformance() {
  const [chartData, setChartData] = useState(null);
  const [summary, setSummary] = useState(null);
  const [topCity, setTopCity] = useState(null);

  useEffect(() => {
    apiClient.get("/recruiter/performance/monthly").then(res => {
      const labels = res.data.map(x => x.month);

      setChartData({
        labels,
        datasets: [
          {
            label: "Submissions",
            data: res.data.map(x => x.submissions),
            borderColor: "#1a73e8",
            backgroundColor: "transparent",
            tension: 0.4,
            pointRadius: 4,
            pointHoverRadius: 6,
            borderWidth: 2,
          },
          {
            label: "Riders",
            data: res.data.map(x => x.riders),
            borderColor: "#34a853",
            backgroundColor: "transparent",
            tension: 0.4,
            pointRadius: 4,
            pointHoverRadius: 6,
            borderWidth: 2,
          },
          {
            label: "Approved",
            data: res.data.map(x => Math.round(x.riders * 0.78)),
            borderColor: "#fbbc05",
            backgroundColor: "transparent",
            tension: 0.4,
            pointRadius: 4,
            pointHoverRadius: 6,
            borderWidth: 2,
          },
        ],
      });
    });

    apiClient.get("/recruiter/performance/summary").then(res => {
      setSummary(res.data);
    });

    apiClient.get("/recruiter/performance/cities").then(res => {
      if (res.data.length > 0) setTopCity(res.data[0]);
    });
  }, []);

  if (!chartData || !summary) return null;

  const bestMonthIndex = chartData.datasets[1].data.indexOf(
    Math.max(...chartData.datasets[1].data)
  );

  const bestMonth =
    chartData.labels[bestMonthIndex] +
    ": " +
    chartData.datasets[1].data[bestMonthIndex] +
    " riders";

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="card">
      <div className="card-header">
        <h5 className="mb-0">
          <i className="bi bi-graph-up me-2"></i>
          Monthly Performance
        </h5>
      </div>

      <div className="card-body">
        <div className="row">
          {/* ✅ FIXED CHART CONTAINER */}
          <div className="col-md-8">
            <div style={{ height: "260px", position: "relative" }}>
              <Line data={chartData} options={options} />
            </div>
          </div>

          <div className="col-md-4">
            <h6 className="mb-3">Performance Insights</h6>

            <div className="mb-3">
              <small className="text-muted d-block">Best Month</small>
              <strong>{bestMonth}</strong>
            </div>

            <div className="mb-3">
              <small className="text-muted d-block">Approval Rate</small>
              <strong>{summary.approvalRate}% overall</strong>
            </div>

            <div className="mb-3">
              <small className="text-muted d-block">Top City</small>
              <strong>
                {topCity
                  ? `${topCity.city}: ${topCity.count} riders`
                  : "N/A"}
              </strong>
            </div>

            <div className="mb-3">
              <small className="text-muted d-block">Avg. Processing Time</small>
              <strong>{summary.avgProcessingTime} days</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}