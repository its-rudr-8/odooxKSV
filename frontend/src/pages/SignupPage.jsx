import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import apiClient from '../api/client';
import { useAuth } from '../hooks/useAuth';
import { getDashboardPath } from '../utils';
import logoUrl from '../assets/Logo.jpeg';

export default function SignupPage() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    role: 'vendor',
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState('');

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
    setSuccess('');
    setIsSubmitting(true);

    try {
      await apiClient.post('/auth/register', formData);
      setSuccess('Account created successfully! Redirecting to login...');
      setFormData({ firstName: '', lastName: '', email: '', password: '', phone: '', role: 'vendor' });
      setTimeout(() => navigate('/login', { replace: true }), 1500);
    } catch (requestError) {
      const message =
        requestError.code === 'ERR_NETWORK'
          ? 'Backend server is not reachable. Start the backend and try again.'
          : requestError.response?.data?.message || 'Registration failed. Please verify your information.';
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', background: '#08111f' }}>
      <form onSubmit={handleSubmit} style={{ maxWidth: '500px', width: '100%', padding: '40px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', background: 'rgba(16,28,49,0.5)' }}>
        <div style={{ textAlign: 'center', marginBottom: 8 }}>
          <img src={logoUrl} alt="VendorBridge" style={{ height: 56 }} />
        </div>
        <h1 style={{ marginTop: 0, textAlign: 'center', color: '#e8edf6' }}>Create Account</h1>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
          <label style={{ display: 'block' }}>
            <div style={{ fontSize: '12px', color: '#9ca9be', marginBottom: '8px' }}>First Name</div>
            <input
              name="firstName"
              onChange={handleChange}
              required
              type="text"
              value={formData.firstName}
              placeholder="John"
              style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(8,17,31,0.72)', color: '#e8edf6', fontSize: '14px', fontFamily: 'inherit', boxSizing: 'border-box' }}
            />
          </label>
          <label style={{ display: 'block' }}>
            <div style={{ fontSize: '12px', color: '#9ca9be', marginBottom: '8px' }}>Last Name</div>
            <input
              name="lastName"
              onChange={handleChange}
              required
              type="text"
              value={formData.lastName}
              placeholder="Doe"
              style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(8,17,31,0.72)', color: '#e8edf6', fontSize: '14px', fontFamily: 'inherit', boxSizing: 'border-box' }}
            />
          </label>
        </div>

        <label style={{ display: 'block', marginBottom: '16px' }}>
          <div style={{ fontSize: '12px', color: '#9ca9be', marginBottom: '8px' }}>Email</div>
          <input
            autoComplete="email"
            name="email"
            onChange={handleChange}
            required
            type="email"
            value={formData.email}
            placeholder="john@company.com"
            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(8,17,31,0.72)', color: '#e8edf6', fontSize: '14px', fontFamily: 'inherit' }}
          />
        </label>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
          <label style={{ display: 'block' }}>
            <div style={{ fontSize: '12px', color: '#9ca9be', marginBottom: '8px' }}>Phone</div>
            <input
              name="phone"
              onChange={handleChange}
              type="tel"
              value={formData.phone}
              placeholder="+1 (555) 000-0000"
              style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(8,17,31,0.72)', color: '#e8edf6', fontSize: '14px', fontFamily: 'inherit', boxSizing: 'border-box' }}
            />
          </label>
          <label style={{ display: 'block' }}>
            <div style={{ fontSize: '12px', color: '#9ca9be', marginBottom: '8px' }}>Role</div>
            <select
              name="role"
              onChange={handleChange}
              value={formData.role}
              style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(8,17,31,0.72)', color: '#e8edf6', fontSize: '14px', fontFamily: 'inherit', boxSizing: 'border-box' }}
            >
              <option value="vendor">Vendor</option>
              <option value="procurement_officer">Procurement Officer</option>
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
            </select>
          </label>
        </div>

        <label style={{ display: 'block', marginBottom: '16px' }}>
          <div style={{ fontSize: '12px', color: '#9ca9be', marginBottom: '8px' }}>Password</div>
          <input
            autoComplete="new-password"
            name="password"
            onChange={handleChange}
            required
            type="password"
            value={formData.password}
            placeholder="••••••••"
            minLength={8}
            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(8,17,31,0.72)', color: '#e8edf6', fontSize: '14px', fontFamily: 'inherit' }}
          />
          <div style={{ fontSize: '11px', color: '#9ca9be', marginTop: '4px' }}>Minimum 8 characters</div>
        </label>

        {error && <div style={{ color: '#ff6b6b', marginBottom: '16px', fontSize: '14px' }}>{error}</div>}
        {success && <div style={{ color: '#4dd0ae', marginBottom: '16px', fontSize: '14px' }}>{success}</div>}

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
          {isSubmitting ? 'Creating account...' : 'Register'}
        </button>

        <p style={{ marginTop: '20px', textAlign: 'center', fontSize: '14px', color: '#9ca9be' }}>
          Already have an account? <Link to="/login" style={{ color: '#4dd0ae', textDecoration: 'none' }}>Sign in</Link>
        </p>
      </form>
    </div>
  );
}
