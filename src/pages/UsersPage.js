import React, { useEffect, useState, useContext } from 'react';
import Layout from '../components/Layout';
import axios from '../api/axiosInstance';
import UserForm from '../forms/UserForm';
import UserTable from '../components/UserTable';
import AuthContext from '../auth/AuthContext';

const UsersPage = () => {
  const { auth } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('/users/list/');
      setUsers(res.data);
    } catch (err) {
      console.error('Failed to fetch users:', err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEdit = (user) => setEditingUser(user);
  const handleSave = () => {
    setEditingUser(null);
    fetchUsers();
  };

  if (!auth?.user?.role || auth.user.role !== 'admin') {
    return (
      <Layout>
        <h2>Access Denied</h2>
        <p>You do not have permission to view this page.</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <h2>User Management</h2>
      <UserForm user={editingUser} onSave={handleSave} />
      <UserTable users={users} onEdit={handleEdit} />
    </Layout>
  );
};

export default UsersPage;