import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";

export default function QuickActions() {
  const navigate = useNavigate();

  const handleUpload = () => {
    navigate("/upload-riders");
  };

  const handleDownloadCsvTemplate = () => {
    const headers = [
      "FullName",
      "Email",
      "PhoneNumber",
      "City",
      "Nationality",
    ];

    const csvContent = headers.join(",") + "\n";

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "rider_upload_template.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadExcelTemplate = () => {
    const data = [
      ["FullName", "Email", "PhoneNumber", "City", "Nationality"],
      ["", "", "", "", ""]
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(data);

    worksheet["!cols"] = [
      { wch: 25 },
      { wch: 30 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 }
    ];

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Riders");

    XLSX.writeFile(workbook, "rider_upload_template.xlsx");
  };

  return (
    <div className="card">
      <div className="card-header">
        <h6 className="mb-0">Quick Actions</h6>
      </div>

      <div
        className="card-body"
        style={{
          display: "grid",
          gap: "14px",
        }}
      >
        <button className="btn btn-primary" onClick={handleUpload}>
          Upload New Rider List
        </button>

        <button
          className="btn btn-outline-primary"
          onClick={handleDownloadCsvTemplate}
        >
          Download CSV Template
        </button>

        <button
          className="btn btn-outline-primary"
          onClick={handleDownloadExcelTemplate}
        >
          Download Excel Template
        </button>
      </div>
    </div>
  );
}