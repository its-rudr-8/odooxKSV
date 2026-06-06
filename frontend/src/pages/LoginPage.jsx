import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import apiClient from '../api/client';
import { useAuth } from '../hooks/useAuth';

export default function LoginPage() {
  const navigate = useNavigate();
  const auth = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (auth.isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const response = await apiClient.post('/auth/login', formData);
      auth.login(response.data.data);
      navigate('/dashboard', { replace: true });
    } catch (requestError) {
      const message =
        requestError.code === 'ERR_NETWORK'
          ? 'Backend server is not reachable. Start the backend on http://localhost:3000 and try again.'
          : requestError.response?.data?.message || 'Login failed. Please check your email and password.';
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="page" style={{ minHeight: '100vh', placeItems: 'center', padding: 20 }}>
      <section className="page__hero" style={{ maxWidth: 520, width: '100%' }}>
        <h2 className="page__title">VendorBridge Login</h2>
        <p className="page__subtitle">Sign in with your registered email and password.</p>

        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 16, marginTop: 28 }}>
          <label style={{ display: 'grid', gap: 8, color: 'var(--muted)' }}>
            Email
            <input
              autoComplete="email"
              name="email"
              onChange={handleChange}
              required
              type="email"
              value={formData.email}
              style={{
                width: '100%',
                border: '1px solid var(--line)',
                borderRadius: 12,
                background: 'rgba(8, 17, 31, 0.72)',
                color: 'var(--text)',
                padding: '12px 14px',
              }}
            />
          </label>

          <label style={{ display: 'grid', gap: 8, color: 'var(--muted)' }}>
            Password
            <input
              autoComplete="current-password"
              name="password"
              onChange={handleChange}
              required
              type="password"
              value={formData.password}
              style={{
                width: '100%',
                border: '1px solid var(--line)',
                borderRadius: 12,
                background: 'rgba(8, 17, 31, 0.72)',
                color: 'var(--text)',
                padding: '12px 14px',
              }}
            />
          </label>

          {error ? <p style={{ color: 'var(--danger)', margin: 0 }}>{error}</p> : null}

          <button
            disabled={isSubmitting}
            type="submit"
            style={{
              border: 0,
              borderRadius: 12,
              background: 'linear-gradient(135deg, var(--accent), var(--accent-2))',
              color: '#04111a',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              fontWeight: 800,
              padding: '12px 14px',
              opacity: isSubmitting ? 0.72 : 1,
            }}
          >
            {isSubmitting ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <p style={{ marginTop: 20, color: 'var(--muted)' }}>
          Need an account? <Link to="/signup">Sign up as a vendor</Link>.
        </p>
      </section>
    </div>
  );
}
