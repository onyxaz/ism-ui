import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from './AuthContext';
import AccessDeniedPage from '../pages/AccessDeniedPage';


const RequireRole = ({ children, roles = [] }) => {
  const { auth } = useContext(AuthContext);

  if (!auth?.user) {
    return <Navigate to="/login" />;
  }
  if (roles.length > 0 && !roles.includes(auth.user.role)) {
    return <AccessDeniedPage />;
  }

  if (roles.length > 0 && !roles.includes(auth.user.role)) {
    return (
      <div style={{ padding: 20 }}>
        <h2>Access Denied</h2>
        <p>You do not have permission to view this page.</p>
      </div>
    );
  }

  return children;
};

export default RequireRole;