import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../auth/AuthContext';

const Sidebar = () => {
  const { auth, logout } = useContext(AuthContext);

  if (!auth?.user) return null;

  const { role } = auth.user;

  return (
    <div style={{ width: 200, background: '#f2f2f2', height: '100vh', padding: 20 }}>
      <h3>ISM</h3>
      <nav>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/products">Products</Link></li>
          <li><Link to="/categories">Categories</Link></li>
          <li><Link to="/inventory/logs">Inventory</Link></li>
          <li><Link to="/sales">Sales</Link></li>
          <li><Link to="/expenses">Expenses</Link></li>
          <li><Link to="/vendors">Vendors</Link></li>
          <li><Link to="/orders">Orders</Link></li>

          {(role === 'admin') && (
            <li><Link to="/users">User Management</Link></li>
          )}

          <li><button onClick={logout}>Logout</button></li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;