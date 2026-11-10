import { useState } from "react";
import { FiEye, FiEyeOff, FiHeart } from "react-icons/fi";
import { Link, Navigate, useNavigate } from "react-router-dom";
import FormInput from "../components/common/FormInput.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { getErrorMessage } from "../services/api.js";

export default function RegisterPage() {
  const { register, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) return <Navigate to="/" replace />;

  function update(field) {
    return (event) => setForm((current) => ({ ...current, [field]: event.target.value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    if (form.name.trim().length < 2 || form.name.trim().length > 50) {
      setError("Your name must be between 2 and 50 characters.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      setError("Enter a valid email address.");
      return;
    }
    if (form.password.length < 8) {
      setError("Your password must be at least 8 characters.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Those passwords don't match yet.");
      return;
    }
    setLoading(true);
    try {
      await register({ name: form.name.trim(), email: form.email.trim(), password: form.password });
      navigate("/", { replace: true });
    } catch (requestError) {
      setError(getErrorMessage(requestError, "We couldn't create your account. Please try again."));
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="auth-page">
      <div className="auth-visual auth-visual-register">
        <div className="auth-visual-content">
          <span className="eyebrow">A seat is waiting</span>
          <h2>Every good meal<br />starts somewhere.</h2>
          <p>Make a little room for new flavors, old favorites, and the joy of cooking.</p>
          <span className="auth-visual-mark"><FiHeart aria-hidden="true" /> Save the recipes that feel like home</span>
        </div>
      </div>
      <div className="auth-form-side">
        <div className="auth-form-wrap">
          <span className="eyebrow">Come on in</span>
          <h1>Join the table.</h1>
          <p className="auth-subtitle">Create your account and keep your favorites close.</p>
          {error && <div className="notice notice-error" role="alert">{error}</div>}
          <form onSubmit={handleSubmit} noValidate>
            <FormInput id="name" label="Full name" autoComplete="name" value={form.name} onChange={update("name")} placeholder="Your name" required />
            <FormInput id="email" label="Email address" type="email" autoComplete="email" value={form.email} onChange={update("email")} placeholder="you@example.com" required />
            <FormInput
              id="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              value={form.password}
              onChange={update("password")}
              placeholder="At least 8 characters"
              required
              rightElement={<button className="input-action" type="button" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? <FiEyeOff /> : <FiEye />}</button>}
            />
            <FormInput
              id="confirm-password"
              label="Confirm password"
              type={showConfirm ? "text" : "password"}
              autoComplete="new-password"
              value={form.confirmPassword}
              onChange={update("confirmPassword")}
              placeholder="Enter your password again"
              required
              rightElement={<button className="input-action" type="button" onClick={() => setShowConfirm((value) => !value)} aria-label={showConfirm ? "Hide confirm password" : "Show confirm password"}>{showConfirm ? <FiEyeOff /> : <FiEye />}</button>}
            />
            <button className="button button-primary auth-submit" type="submit" disabled={loading}>{loading ? "Creating your account..." : "Create account"}</button>
          </form>
          <p className="auth-switch">Already one of us? <Link to="/login">Log in</Link></p>
        </div>
      </div>
    </section>
  );
}
