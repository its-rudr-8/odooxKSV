import { useAuth } from '../hooks/useAuth';

export default function DebugPage() {
  const auth = useAuth();
  
  return (
    <div style={{
      padding: '40px',
      fontSize: '16px',
      lineHeight: '1.6',
      fontFamily: 'monospace',
    }}>
      <h1>🔍 Frontend Debug Page</h1>
      
      <section style={{ marginBottom: '20px', padding: '20px', background: '#1a1a1a', borderRadius: '8px' }}>
        <h2>✅ Frontend is Running</h2>
        <p>This page loaded successfully!</p>
      </section>

      <section style={{ marginBottom: '20px', padding: '20px', background: '#1a1a1a', borderRadius: '8px' }}>
        <h2>🔐 Authentication Status</h2>
        <p><strong>Is Authenticated:</strong> {auth.isAuthenticated ? 'YES ✅' : 'NO ❌'}</p>
        <p><strong>User Email:</strong> {auth.user?.email || 'Not logged in'}</p>
        <p><strong>User Role:</strong> {auth.user?.role || 'None'}</p>
      </section>

      <section style={{ marginBottom: '20px', padding: '20px', background: '#1a1a1a', borderRadius: '8px' }}>
        <h2>🧭 Navigation</h2>
        <ul>
          <li><a href="/login" style={{ color: '#4dd0ae' }}>→ Go to Login</a></li>
          <li><a href="/signup" style={{ color: '#4dd0ae' }}>→ Go to Signup</a></li>
          {auth.isAuthenticated && (
            <>
              <li><a href="/dashboard" style={{ color: '#4dd0ae' }}>→ Go to Dashboard</a></li>
              <li><button onClick={() => auth.logout()} style={{ background: 'none', border: 'none', color: '#ff6b6b', cursor: 'pointer', textDecoration: 'underline' }}>→ Logout</button></li>
            </>
          )}
        </ul>
      </section>

      <section style={{ padding: '20px', background: '#1a1a1a', borderRadius: '8px' }}>
        <h2>💾 LocalStorage</h2>
        <p><strong>Access Token:</strong> {localStorage.getItem('vb_access_token') ? '✅ Present' : '❌ Missing'}</p>
        <p><strong>User Data:</strong> {localStorage.getItem('vb_user') ? '✅ Present' : '❌ Missing'}</p>
      </section>
    </div>
  );
}
