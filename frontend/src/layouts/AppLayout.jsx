import { Outlet } from 'react-router-dom';
import Topbar from '../components/Topbar';

export default function AppLayout() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Topbar />
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
    </div>
  );
}
