import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import axios from '../api/axiosInstance';
import InventoryLogForm from '../forms/InventoryLogForm';
import InventoryLogTable from '../components/InventoryLogTable';

const InventoryLogPage = () => {
  const [logs, setLogs] = useState([]);
  const [filters, setFilters] = useState({ product_name: '', action: '', date_from: '', date_to: '' });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchLogs = async () => {
    const params = new URLSearchParams({ ...filters, page });
    try {
      const res = await axios.get(`/inventory/logs/?${params.toString()}`);
      setLogs(res.data.results);
      setTotalPages(Math.ceil(res.data.count / 10));
    } catch (err) {
      console.error('Error loading inventory logs:', err);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [filters, page]);

  const handleCreate = () => {
    fetchLogs();
  };

  return (
    <Layout>
      <h2>Inventory Logs</h2>

      <div style={{ marginBottom: 20 }}>
        <input
          placeholder="Product Name"
          value={filters.product_name}
          onChange={(e) => setFilters({ ...filters, product_name: e.target.value })}
        />
        <select
          value={filters.action}
          onChange={(e) => setFilters({ ...filters, action: e.target.value })}
        >
          <option value="">All Actions</option>
          <option value="add">Add</option>
          <option value="remove">Remove</option>
          <option value="low_stock">Low Stock</option>
        </select>
        <input
          type="date"
          value={filters.date_from}
          onChange={(e) => setFilters({ ...filters, date_from: e.target.value })}
        />
        <input
          type="date"
          value={filters.date_to}
          onChange={(e) => setFilters({ ...filters, date_to: e.target.value })}
        />
        <button onClick={() => fetchLogs()}>Filter</button>
      </div>

      <InventoryLogForm onCreate={handleCreate} />

      <InventoryLogTable logs={logs} />

      <div style={{ marginTop: 20 }}>
        Page: {page} / {totalPages}
        <button disabled={page <= 1} onClick={() => setPage(page - 1)}>Prev</button>
        <button disabled={page >= totalPages} onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </Layout>
  );
};

export default InventoryLogPage;