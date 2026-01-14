import { Outlet } from "react-router-dom";
import { useAuth } from "../../context/RecruiterContext";
import RecruiterSidebar from "./RecruiterSidebar";
import AdminSidebar from "./AdminSidebar";
import Navbar from "./Navbar";

export default function MainLayout() {
  const { user } = useAuth();

  const isAdmin = user?.roles?.includes("Admin");

  return (
    <>
      {isAdmin ? <AdminSidebar /> : <RecruiterSidebar />}

      <div className="main-content">
        <Navbar />

        <main style={{ width: "100%", maxWidth: "100%" }}>
          <Outlet />
        </main>
      </div>
    </>
  );
}