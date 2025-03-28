import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import axios from '../api/axiosInstance';
import ExpenseForm from '../forms/ExpenseForm';
import ExpenseTable from '../components/ExpenseTable';
import ExpenseSummary from '../components/ExpenseSummary';

const ExpensesPage = () => {
  const [expenses, setExpenses] = useState([]);
  const [filters, setFilters] = useState({ vendor: '', type: '', date_from: '', date_to: '' });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchExpenses = async () => {
    const params = new URLSearchParams({ ...filters, page });
    try {
      const res = await axios.get(`/business-expenses/list/?${params.toString()}`);
      setExpenses(res.data.results);
      setTotalPages(Math.ceil(res.data.count / 10));
    } catch (err) {
      console.error('Failed to load expenses:', err);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, [filters, page]);

  const handleCreate = () => {
    fetchExpenses();
  };

  return (
    <Layout>
      <h2>Business Expenses</h2>

      <div style={{ marginBottom: 20 }}>
        <input
          placeholder="Vendor"
          value={filters.vendor}
          onChange={(e) => setFilters({ ...filters, vendor: e.target.value })}
        />
        <input
          placeholder="Type"
          value={filters.type}
          onChange={(e) => setFilters({ ...filters, type: e.target.value })}
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
        <button onClick={fetchExpenses}>Filter</button>
      </div>

      <ExpenseForm onCreate={handleCreate} />

      <ExpenseTable expenses={expenses} />

      <div style={{ marginTop: 20 }}>
        Page: {page} / {totalPages}
        <button disabled={page <= 1} onClick={() => setPage(page - 1)}>Prev</button>
        <button disabled={page >= totalPages} onClick={() => setPage(page + 1)}>Next</button>
      </div>

      <ExpenseSummary filters={filters} />
    </Layout>
  );
};

export default ExpensesPage;