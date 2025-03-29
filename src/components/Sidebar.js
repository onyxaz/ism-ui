import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../auth/AuthContext';

const Sidebar = () => {
  const { auth, logout } = useContext(AuthContext);
  const role = auth?.user?.role;
  if (!auth?.user) return null;

  return (
    <aside className="w-64 bg-white shadow-md border-r min-h-screen p-4">
      <h2 className="text-2xl font-bold text-blue-600 mb-6">ISM</h2>
      <nav className="space-y-2">
        <SidebarLink to="/dashboard" label="Dashboard" />
        <SidebarLink to="/products" label="Products" />
        <SidebarLink to="/categories" label="Categories" />
        <SidebarLink to="/inventory/logs" label="Inventory" />
        <SidebarLink to="/sales" label="Sales" />
        <SidebarLink to="/expenses" label="Expenses" />
        <SidebarLink to="/vendors" label="Vendors" />
        <SidebarLink to="/orders" label="Orders" />
        {role === 'admin' && <SidebarLink to="/users" label="Users" />}
        <button
          onClick={logout}
          className="mt-6 w-full text-left text-red-500 hover:underline text-sm"
        >
          Logout
        </button>
      </nav>
    </aside>
  );
};

const SidebarLink = ({ to, label }) => (
  <Link to={to} className="block px-2 py-1 rounded hover:bg-blue-100 transition-colors text-sm">
    {label}
  </Link>
);

export default Sidebar;