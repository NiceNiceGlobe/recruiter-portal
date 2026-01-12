import { useState } from "react";
import { Outlet } from "react-router-dom";
import RecruiterSidebar from "./RecruiterSidebar";
import AdminSidebar from "./AdminSidebar";
import Navbar from "./Navbar";

export default function MainLayout() {
  const [view, setView] = useState("recruiter");

  return (
    <>
      {view === "recruiter" && (
        <RecruiterSidebar onSwitchToAdmin={() => setView("admin")} />
      )}

      {view === "admin" && (
        <AdminSidebar
          visible
          onSwitchToRecruiter={() => setView("recruiter")}
        />
      )}

      <div className="main-content">
        <Navbar
          view={view}
          onSwitchToAdmin={() => setView("admin")}
          onSwitchToRecruiter={() => setView("recruiter")}
        />

        <main style={{ width: "100%", maxWidth: "100%" }}>
          <Outlet />
        </main>
      </div>
    </>
  );
}