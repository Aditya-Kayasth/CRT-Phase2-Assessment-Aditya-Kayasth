import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import CustomerPage from './pages/CustomerPage';
import PolicyPage from './pages/PolicyPage';
import ClaimPage from './pages/ClaimPage';

export default function App() {
  return (
    <BrowserRouter>
      {/* Global Navigation Bar */}
      <nav style={{ padding: '15px 30px', background: '#1a1a1a', marginBottom: '20px' }}>
        <Link to="/" style={{ color: '#fff', marginRight: '30px', textDecoration: 'none', fontSize: '18px', fontWeight: 'bold' }}>
          👥 Customers
        </Link>
        <Link to="/policies" style={{ color: '#fff', marginRight: '30px', textDecoration: 'none', fontSize: '18px', fontWeight: 'bold' }}>
          🛡️ Policies
        </Link>
        <Link to="/claims" style={{ color: '#fff', textDecoration: 'none', fontSize: '18px', fontWeight: 'bold' }}>
          📄 Claims
        </Link>
      </nav>

      {/* Page Content Routes */}
      <div style={{ padding: '0 20px' }}>
        <Routes>
          <Route path="/" element={<CustomerPage />} />
          <Route path="/policies" element={<PolicyPage />} />
          <Route path="/claims" element={<ClaimPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}