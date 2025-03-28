import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import RegisterTenantPage from './pages/RegisterTenantPage';
import DashboardPage from './pages/DashboardPage';
import UsersPage from './pages/UsersPage'; // 👈 Import this if you use it

import PrivateRoute from './auth/PrivateRoute';
import RequireRole from './auth/RequireRole';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register-tenant" element={<RegisterTenantPage />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />

        {/* Admin-only Route */}
        <Route
          path="/users"
          element={
            <PrivateRoute>
              <RequireRole roles={['admin']}>
                <UsersPage />
              </RequireRole>
            </PrivateRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;