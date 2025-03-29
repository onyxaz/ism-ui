import React from 'react';
import Sidebar from './Sidebar';

const Layout = ({ children }) => (
  <div className="flex min-h-screen bg-gray-100 text-gray-800">
    <Sidebar />
    <main className="flex-1 p-6 bg-gray-50 overflow-auto shadow-inner">
      {children}
    </main>
  </div>
);

export default Layout;