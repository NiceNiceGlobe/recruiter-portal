import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../../services/apiClient";

export default function UploadRiders() {
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = useState(null);
  const [showProcessing, setShowProcessing] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [progress, setProgress] = useState(0);

  const [submissionId, setSubmissionId] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    const res = await apiClient.get("/recruiter/my-submissions");
    setSubmissions(res.data);
  };

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedFile(file);
    setShowProcessing(true);
    setProgress(0);

    const submissionRes = await apiClient.post(
      "/recruiter/upload-submission",
      {
        fileName: file.name,
        totalRiders: 0,
      }
    );

    setSubmissionId(submissionRes.data.submissionId);

    let value = 0;
    const interval = setInterval(() => {
      value += 20;
      setProgress(value);

      if (value >= 100) {
        clearInterval(interval);
        setShowProcessing(false);
        setShowPreview(true);
      }
    }, 400);

    e.target.value = "";
  };

  const handleConfirmUpload = async () => {
    if (!selectedFile || !submissionId) return;

    setIsUploading(true);

    const formData = new FormData();
    formData.append("file", selectedFile);

    await apiClient.post(
      `/recruiter/upload-csv/${submissionId}`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    setIsUploading(false);
    setSelectedFile(null);
    setShowPreview(false);
    setProgress(0);
    setSubmissionId(null);

    await loadHistory();
  };

  const handleCancel = () => {
    if (isUploading) return;
    setSelectedFile(null);
    setShowPreview(false);
    setProgress(0);
    setSubmissionId(null);
  };

  const downloadTemplate = () => {
    const csv =
      "Full Name,Email,Phone Number,City / Area,Nationality,ID / Passport No\nJohn Doe,john@example.com,0812345678,Johannesburg,South African,123456789";
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "rider_template.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="view-content">
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">
                <i className="bi bi-cloud-upload me-2"></i>
                Upload Rider List
              </h5>
            </div>

            <div className="card-body">
              <div className="row mb-5">
                <div className="col-lg-6">
                  <h5 className="mb-3">Upload Spreadsheet</h5>
                  <p className="text-muted mb-4">
                    Upload a CSV or Excel file containing rider information.
                    Ensure your file follows the required format.
                  </p>

                  <div
                    id="fileUploadArea"
                    className="upload-area"
                    onClick={handleBrowseClick}
                  >
                    <div className="upload-icon">
                      <i className="bi bi-file-earmark-spreadsheet"></i>
                    </div>

                    <h5 className="mb-2">Drag & drop your file here</h5>
                    <p className="text-muted mb-3">or click to browse</p>

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".csv,.xlsx,.xls"
                      onChange={handleFileChange}
                      style={{ display: "none" }}
                    />

                    <button
                      className="btn btn-primary"
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBrowseClick();
                      }}
                    >
                      <i className="bi bi-folder2-open me-2"></i>
                      Browse Files
                    </button>

                    <p className="mt-3 mb-0 text-muted small">
                      Supported formats: CSV, XLSX, XLS (Max 10MB)
                    </p>
                  </div>

                  {showProcessing && (
                    <div className="mt-4">
                      <h6>Processing File...</h6>
                      <div className="progress">
                        <div
                          className="progress-bar progress-bar-striped progress-bar-animated"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <p className="mt-2 mb-0 text-muted small">
                        Processing {selectedFile?.name}
                      </p>
                    </div>
                  )}

                  {showPreview && (
                    <div className="mt-4">
                      <h6>File Preview</h6>

                      <div className="mt-3">
                        <button
                          className="btn btn-success"
                          onClick={handleConfirmUpload}
                          disabled={isUploading}
                        >
                          {isUploading ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-2"></span>
                              Uploading...
                            </>
                          ) : (
                            <>
                              <i className="bi bi-check-circle me-2"></i>
                              Confirm Upload
                            </>
                          )}
                        </button>
                        <button
                          className="btn btn-outline-secondary ms-2"
                          onClick={handleCancel}
                          disabled={isUploading}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="col-lg-6">
                  <h5 className="mb-3">File Requirements</h5>

                  <div className="card mb-4">
                    <div className="card-body">
                      <h6 className="mb-3">Required Columns</h6>

                      <div className="row">
                        <div className="col-md-6">
                          <ul className="list-unstyled">
                            <li className="mb-2">
                              <i className="bi bi-check-circle text-success me-2"></i>
                              Full Name
                            </li>
                            <li className="mb-2">
                              <i className="bi bi-check-circle text-success me-2"></i>
                              Email
                            </li>
                            <li className="mb-2">
                              <i className="bi bi-check-circle text-success me-2"></i>
                              Phone Number
                            </li>
                            <li className="mb-2">
                              <i className="bi bi-check-circle text-success me-2"></i>
                              City / Area
                            </li>
                          </ul>
                        </div>

                        <div className="col-md-6">
                          <ul className="list-unstyled">
                            <li className="mb-2">
                              <i className="bi bi-check-circle text-success me-2"></i>
                              Nationality
                            </li>
                            <li className="mb-2">
                              <i className="bi bi-check-circle text-success me-2"></i>
                              ID / Passport No
                            </li>
                            <li className="mb-2">
                              <i className="bi bi-circle text-muted me-2"></i>
                              Years Experience
                            </li>
                            <li className="mb-2">
                              <i className="bi bi-circle text-muted me-2"></i>
                              Uber Profile
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="card">
                    <div className="card-body">
                      <h6 className="mb-3">Download Template</h6>
                      <p className="text-muted mb-3">
                        Use our template to ensure your file has the correct format.
                      </p>

                      <button
                        className="btn btn-outline-primary w-100"
                        onClick={downloadTemplate}
                      >
                        <i className="bi bi-download me-2"></i>
                        Download CSV Template
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <h5 className="mb-3">Upload History</h5>

              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>File Name</th>
                      <th>Upload Date</th>
                      <th>Riders Count</th>
                      <th>Status</th>
                      <th>Admin Feedback</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {submissions.map((s) => (
                      <tr key={s.id}>
                        <td>{s.fileName}</td>
                        <td>{new Date(s.uploadedAt).toLocaleDateString()}</td>
                        <td>{s.totalRiders}</td>
                        <td>
                          <span className="badge badge-pending">{s.status}</span>
                        </td>
                        <td>{s.adminFeedback || "-"}</td>
                        <td>
                          <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => navigate(`/submissions/${s.id}`)}
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}