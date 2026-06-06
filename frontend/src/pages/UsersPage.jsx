import { useState } from 'react';
import apiClient from '../api/client';

const defaultForm = { firstName: '', lastName: '', email: '', password: '', role: 'vendor' };

export default function UsersPage() {
  const [formData, setFormData] = useState(defaultForm);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setMessage('');
    setIsSubmitting(true);

    try {
      await apiClient.post('/auth/register', formData);
      setMessage('User created successfully.');
      setFormData(defaultForm);
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Unable to create user.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="page">
      <section className="panel">
        <h2>User management</h2>
        <p>Admin can create new procurement and vendor accounts from this panel.</p>
      </section>

      <section className="panel" style={{ maxWidth: 640 }}>
        <h3>Create a new user</h3>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 16 }}>
          <div style={{ display: 'grid', gap: 12 }}>
            <label>
              First name
              <input name="firstName" value={formData.firstName} onChange={handleChange} required type="text" />
            </label>
            <label>
              Last name
              <input name="lastName" value={formData.lastName} onChange={handleChange} required type="text" />
            </label>
            <label>
              Email
              <input name="email" value={formData.email} onChange={handleChange} required type="email" />
            </label>
            <label>
              Password
              <input name="password" value={formData.password} onChange={handleChange} required type="password" minLength={8} />
            </label>
            <label>
              Role
              <select name="role" value={formData.role} onChange={handleChange}>
                <option value="admin">Admin</option>
                <option value="manager">Manager</option>
                <option value="procurement_officer">Procurement Officer</option>
                <option value="vendor">Vendor</option>
              </select>
            </label>
          </div>

          {error ? <p style={{ color: 'var(--danger)', margin: 0 }}>{error}</p> : null}
          {message ? <p style={{ color: 'var(--success)', margin: 0 }}>{message}</p> : null}

          <button type="submit" disabled={isSubmitting} style={{ borderRadius: 12, padding: '12px 16px', background: 'linear-gradient(135deg, var(--accent), var(--accent-2))', border: 0, color: '#04111a', fontWeight: 700 }}>
            {isSubmitting ? 'Creating user...' : 'Create user'}
          </button>
        </form>
      </section>
    </div>
  );
}
