import { createContext, useContext, useEffect, useState } from "react";
import apiClient from "../services/apiClient";

const RecruiterContext = createContext(null);

export function RecruiterProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient
      .get("/recruiter/me")
      .then(res => setUser(res.data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const clearUser = () => setUser(null);

  return (
    <RecruiterContext.Provider value={{ user, loading, clearUser }}>
      {children}
    </RecruiterContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(RecruiterContext);
  if (!ctx) throw new Error("useAuth must be used inside RecruiterProvider");
  return ctx;
}