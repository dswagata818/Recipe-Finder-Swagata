import { useState } from "react";
import { FiEye, FiEyeOff, FiLock } from "react-icons/fi";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import FormInput from "../components/common/FormInput.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { getErrorMessage } from "../services/api.js";

export default function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) return <Navigate to="/" replace />;

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    if (!email.trim() || !password) {
      setError("Enter your email address and password to continue.");
      return;
    }
    setLoading(true);
    try {
      await login({ email: email.trim(), password });
      navigate(location.state?.from?.pathname || "/", { replace: true });
    } catch (requestError) {
      setError(getErrorMessage(requestError, "We couldn't log you in. Please try again."));
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="auth-page">
      <div className="auth-visual auth-visual-login">
        <div className="auth-visual-content">
          <span className="eyebrow">Pull up a chair</span>
          <h2>There's always<br />room at the table.</h2>
          <p>Sign in to find your saved recipes and keep the good meals coming.</p>
          <span className="auth-visual-mark"><FiLock aria-hidden="true" /> Your recipe box, ready when you are</span>
        </div>
      </div>
      <div className="auth-form-side">
        <div className="auth-form-wrap">
          <span className="eyebrow">Welcome back</span>
          <h1>Good to see you.</h1>
          <p className="auth-subtitle">Sign in and let's get cooking.</p>
          {error && <div className="notice notice-error" role="alert">{error}</div>}
          <form onSubmit={handleSubmit} noValidate>
            <FormInput id="email" label="Email address" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" required />
            <FormInput
              id="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Your password"
              required
              rightElement={<button className="input-action" type="button" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? <FiEyeOff /> : <FiEye />}</button>}
            />
            <button className="button button-primary auth-submit" type="submit" disabled={loading}>{loading ? "Signing you in..." : "Log in"}</button>
          </form>
          <p className="auth-switch">New to the table? <Link to="/register">Create an account</Link></p>
        </div>
      </div>
    </section>
  );
}
