import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import axios from '../api/axiosInstance';
import VendorForm from '../forms/VendorForm';
import VendorTable from '../components/VendorTable';

const VendorsPage = () => {
  const [vendors, setVendors] = useState([]);
  const [search, setSearch] = useState('');
  const [editingVendor, setEditingVendor] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchVendors = async () => {
    const params = new URLSearchParams({ search, page });
    try {
      const res = await axios.get(`/vendors/list/?${params.toString()}`);
      setVendors(res.data.results);
      setTotalPages(Math.ceil(res.data.count / 10));
    } catch (err) {
      console.error('Failed to fetch vendors:', err);
    }
  };

  useEffect(() => {
    fetchVendors();
  }, [search, page]);

  const handleEdit = (vendor) => setEditingVendor(vendor);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this vendor?')) return;
    await axios.delete(`/vendors/delete/${id}/`);
    fetchVendors();
  };

  const handleSave = () => {
    setEditingVendor(null);
    fetchVendors();
  };

  return (
    <Layout>
      <h2>Vendors</h2>

      <input
        placeholder="Search by name/email"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: 20 }}
      />

      <VendorForm vendor={editingVendor} onSave={handleSave} />

      <VendorTable
        vendors={vendors}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <div style={{ marginTop: 20 }}>
        Page: {page} / {totalPages}
        <button disabled={page <= 1} onClick={() => setPage(page - 1)}>Prev</button>
        <button disabled={page >= totalPages} onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </Layout>
  );
};

export default VendorsPage;