import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import apiClient from '../api/client';
import { useAuth } from '../hooks/useAuth';
import { getDashboardPath } from '../utils';

export default function LoginPage() {
  const navigate = useNavigate();
  const auth = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (auth.isAuthenticated) {
    return <Navigate to={getDashboardPath(auth.user?.role)} replace />;
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
      const authData = response.data.data;
      auth.login(authData);
      navigate(getDashboardPath(authData.user?.role), { replace: true });
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
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', background: '#08111f' }}>
      <form onSubmit={handleSubmit} style={{ maxWidth: '400px', width: '100%', padding: '40px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', background: 'rgba(16,28,49,0.5)' }}>
        <h1 style={{ marginTop: 0, textAlign: 'center', color: '#e8edf6' }}>VendorBridge Login</h1>
        
        <label style={{ display: 'block', marginBottom: '16px' }}>
          <div style={{ fontSize: '12px', color: '#9ca9be', marginBottom: '8px' }}>Email</div>
          <input
            autoComplete="email"
            name="email"
            onChange={handleChange}
            required
            type="email"
            value={formData.email}
            placeholder="you@example.com"
            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(8,17,31,0.72)', color: '#e8edf6', fontSize: '14px', fontFamily: 'inherit' }}
          />
        </label>

        <label style={{ display: 'block', marginBottom: '16px' }}>
          <div style={{ fontSize: '12px', color: '#9ca9be', marginBottom: '8px' }}>Password</div>
          <input
            autoComplete="current-password"
            name="password"
            onChange={handleChange}
            required
            type="password"
            value={formData.password}
            placeholder="••••••••"
            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(8,17,31,0.72)', color: '#e8edf6', fontSize: '14px', fontFamily: 'inherit' }}
          />
        </label>

        {error && <div style={{ color: '#ff6b6b', marginBottom: '16px', fontSize: '14px' }}>{error}</div>}

        <button
          disabled={isSubmitting}
          type="submit"
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '8px',
            border: 'none',
            background: 'linear-gradient(135deg, #4dd0ae, #7cc4ff)',
            color: '#04111a',
            fontWeight: 'bold',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            opacity: isSubmitting ? 0.7 : 1,
          }}
        >
          {isSubmitting ? 'Signing in...' : 'Sign in'}
        </button>

        <p style={{ marginTop: '20px', textAlign: 'center', fontSize: '14px', color: '#9ca9be' }}>
          Need an account? <Link to="/signup" style={{ color: '#4dd0ae', textDecoration: 'none' }}>Sign up</Link>
        </p>
      </form>
    </div>
  );
}
