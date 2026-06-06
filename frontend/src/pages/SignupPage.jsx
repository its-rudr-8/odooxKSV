import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import apiClient from '../api/client';
import { useAuth } from '../hooks/useAuth';

export default function SignupPage() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState('');

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
    setSuccess('');
    setIsSubmitting(true);

    try {
      await apiClient.post('/auth/register', {
        ...formData,
        role: 'vendor',
      });
      setSuccess('Signup successful. You may now log in.');
      setFormData({ firstName: '', lastName: '', email: '', password: '' });
      setTimeout(() => navigate('/login', { replace: true }), 1200);
    } catch (requestError) {
      const message =
        requestError.code === 'ERR_NETWORK'
          ? 'Backend server is not reachable. Start the backend and try again.'
          : requestError.response?.data?.message || 'Signup failed. Please verify your information.';
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="page" style={{ minHeight: '100vh', placeItems: 'center', padding: 20 }}>
      <section className="page__hero" style={{ maxWidth: 520, width: '100%' }}>
        <h2 className="page__title">VendorBridge Sign Up</h2>
        <p className="page__subtitle">Create a vendor account to submit quotations and track RFQ progress.</p>

        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 16, marginTop: 28 }}>
          <div style={{ display: 'grid', gap: 16 }}>
            <label style={{ display: 'grid', gap: 8, color: 'var(--muted)' }}>
              First name
              <input
                name="firstName"
                onChange={handleChange}
                required
                type="text"
                value={formData.firstName}
                style={{ width: '100%', padding: '12px 14px' }}
              />
            </label>
            <label style={{ display: 'grid', gap: 8, color: 'var(--muted)' }}>
              Last name
              <input
                name="lastName"
                onChange={handleChange}
                required
                type="text"
                value={formData.lastName}
                style={{ width: '100%', padding: '12px 14px' }}
              />
            </label>
            <label style={{ display: 'grid', gap: 8, color: 'var(--muted)' }}>
              Email
              <input
                autoComplete="email"
                name="email"
                onChange={handleChange}
                required
                type="email"
                value={formData.email}
                style={{ width: '100%', padding: '12px 14px' }}
              />
            </label>
            <label style={{ display: 'grid', gap: 8, color: 'var(--muted)' }}>
              Password
              <input
                autoComplete="new-password"
                name="password"
                onChange={handleChange}
                required
                type="password"
                value={formData.password}
                minLength={8}
                style={{ width: '100%', padding: '12px 14px' }}
              />
            </label>
          </div>

          {error ? <p style={{ color: 'var(--danger)', margin: 0 }}>{error}</p> : null}
          {success ? <p style={{ color: 'var(--success)', margin: 0 }}>{success}</p> : null}

          <button
            disabled={isSubmitting}
            type="submit"
            style={{ border: 0, borderRadius: 12, background: 'linear-gradient(135deg, var(--accent), var(--accent-2))', color: '#04111a', cursor: isSubmitting ? 'not-allowed' : 'pointer', fontWeight: 800, padding: '12px 14px', opacity: isSubmitting ? 0.72 : 1 }}
          >
            {isSubmitting ? 'Creating account...' : 'Sign up as vendor'}
          </button>
        </form>

        <p style={{ marginTop: 20, color: 'var(--muted)' }}>
          Already registered? <Link to="/login">Sign in</Link>.
        </p>
      </section>
    </div>
  );
}
