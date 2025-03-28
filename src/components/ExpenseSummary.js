import React, { useEffect, useState } from 'react';
import axios from '../api/axiosInstance';

const ExpenseSummary = ({ filters }) => {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const loadSummary = async () => {
      try {
        const params = new URLSearchParams(filters);
        const res = await axios.get(`/business-expenses/summary/?${params.toString()}`);
        setSummary(res.data);
      } catch (err) {
        console.error('Failed to load expense summary:', err);
      }
    };

    loadSummary();
  }, [filters]);

  if (!summary) return null;

  return (
    <div style={{ marginTop: 40 }}>
      <h3>Expense Summary</h3>
      <p>Total Expenses: {summary.total_expenses}</p>
    </div>
  );
};

export default ExpenseSummary;