export default function StatCard({ value, label, footer, progress, color }) {
  return (
    <div className={`card stats-card ${color || ""}`}>
      <div className="card-body">
        <div className="stats-number">{value}</div>
        <div className="stats-label">{label}</div>

        {footer && <div className="mt-2">{footer}</div>}

        {progress !== undefined && (
          <>
            <div className="progress">
              <div
                className="progress-bar"
                style={{ width: `${progress}%` }}
              />
            </div>
            <small>{progress}% achieved</small>
          </>
        )}
      </div>
    </div>
  );
}