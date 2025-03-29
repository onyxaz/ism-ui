import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../auth/AuthContext';

const Sidebar = () => {
  const { auth, logout } = useContext(AuthContext);

  if (!auth?.user) return null;

  const { role } = auth.user;

  return (
    <aside className="w-64 bg-white shadow-md p-4">
      <h2 className="text-xl font-bold mb-6">ISM</h2>
      <nav>
        <ul className="space-y-2">
          <li><Link className="block hover:text-blue-500" to="/dashboard">Dashboard</Link></li>
          <li><Link className="block hover:text-blue-500" to="/products">Products</Link></li>
          <li><Link className="block hover:text-blue-500" to="/categories">Categories</Link></li>
          <li><Link className="block hover:text-blue-500" to="/inventory/logs">Inventory</Link></li>
          <li><Link className="block hover:text-blue-500" to="/sales">Sales</Link></li>
          <li><Link className="block hover:text-blue-500" to="/expenses">Expenses</Link></li>
          <li><Link className="block hover:text-blue-500" to="/vendors">Vendors</Link></li>
          <li><Link className="block hover:text-blue-500" to="/orders">Orders</Link></li>
          {role === 'admin' && (
            <li><Link className="block hover:text-blue-500" to="/users">Users</Link></li>
          )}
          <li>
            <button
              className="mt-4 w-full text-left text-red-500 hover:underline"
              onClick={logout}
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;