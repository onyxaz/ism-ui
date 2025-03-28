import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import axios from '../api/axiosInstance';
import OrderForm from '../forms/OrderForm';
import OrderTable from '../components/OrderTable';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [filters, setFilters] = useState({ status: '', date_from: '', date_to: '' });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchOrders = async () => {
    const params = new URLSearchParams({ ...filters, page });
    try {
      const res = await axios.get(`/orders/list/?${params.toString()}`);
      setOrders(res.data.results);
      setTotalPages(Math.ceil(res.data.count / 10));
    } catch (err) {
      console.error('Failed to fetch orders:', err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [filters, page]);

  const handleCreate = () => {
    fetchOrders();
  };

  return (
    <Layout>
      <h2>Orders</h2>

      <div style={{ marginBottom: 20 }}>
        <select
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        >
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="shipped">Shipped</option>
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
        <button onClick={fetchOrders}>Filter</button>
      </div>

      <OrderForm onCreate={handleCreate} />

      <OrderTable orders={orders} />

      <div style={{ marginTop: 20 }}>
        Page: {page} / {totalPages}
        <button disabled={page <= 1} onClick={() => setPage(page - 1)}>Prev</button>
        <button disabled={page >= totalPages} onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </Layout>
  );
};

export default OrdersPage;