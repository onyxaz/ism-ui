import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import axios from '../api/axiosInstance';
import SalesForm from '../forms/SalesForm';
import SalesTable from '../components/SalesTable';
import SalesSummary from '../components/SalesSummary';

const SalesPage = () => {
  const [sales, setSales] = useState([]);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({ date_from: '', date_to: '' });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchSales = async () => {
    const params = new URLSearchParams({ search, page, ...filters });
    try {
      const res = await axios.get(`/sales/list/?${params.toString()}`);
      setSales(res.data.results);
      setTotalPages(Math.ceil(res.data.count / 10));
    } catch (err) {
      console.error('Failed to fetch sales:', err);
    }
  };

  useEffect(() => {
    fetchSales();
  }, [search, page, filters]);

  const handleCreate = () => {
    fetchSales();
  };

  return (
    <Layout>
      <h2>Sales</h2>

      <div style={{ marginBottom: 20 }}>
        <input
          placeholder="Search (product, customer)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
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
        <button onClick={() => fetchSales()}>Filter</button>
      </div>

      <SalesForm onCreate={handleCreate} />

      <SalesTable sales={sales} />

      <div style={{ marginTop: 20 }}>
        Page: {page} / {totalPages}
        <button disabled={page <= 1} onClick={() => setPage(page - 1)}>Prev</button>
        <button disabled={page >= totalPages} onClick={() => setPage(page + 1)}>Next</button>
      </div>

      <SalesSummary filters={filters} />
    </Layout>
  );
};

export default SalesPage;