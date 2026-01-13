import { createContext, useContext, useEffect, useState } from "react";
import apiClient from "../services/apiClient";

const RecruiterContext = createContext(null);

export function RecruiterProvider({ children }) {
  const getStoredUser = () => {
    try {
      const raw = localStorage.getItem("user");
      if (!raw || raw === "undefined") return null;
      return JSON.parse(raw);
    } catch {
      return null;
    }
  };

  const [user, setUser] = useState(getStoredUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    apiClient
      .get("/recruiter/me")
      .then(res => setUser(res.data))
      .catch(() => {
        localStorage.removeItem("user");
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const clearUser = () => {
    localStorage.removeItem("user");
    setUser(null);
    setLoading(false);
  };

  return (
    <RecruiterContext.Provider value={{ user, loading, clearUser }}>
      {!loading && children}
    </RecruiterContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(RecruiterContext);
  if (!ctx) throw new Error("useAuth must be used inside RecruiterProvider");
  return ctx;
}