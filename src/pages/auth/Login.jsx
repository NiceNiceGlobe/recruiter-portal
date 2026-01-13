import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../../services/apiClient";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await apiClient.post("/account/login", {
        email,
        password,
        rememberMe: true,
      });

      const { id, email: userEmail, roles } = response.data;

      localStorage.setItem(
        "user",
        JSON.stringify({ id, email: userEmail, roles })
      );

      if (roles.includes("Recruiter")) {
        navigate("/dashboard");
      } else if (roles.includes("Admin")) {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <h1 className="login-logo">Valternative</h1>
          <p className="login-subtitle">
            Rider Recruitment Management
          </p>
        </div>

        <h2 className="login-title">Welcome Back!</h2>

        {error && <div className="login-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn-login"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <div className="login-links">
          <a href="#">Forgot My Password</a>
        </div>

        <div className="login-footer">
          <a href="#">Terms of use</a>
          <span>|</span>
          <a href="#">Privacy policy</a>
        </div>
      </div>
    </div>
  );
}