import React, { useEffect, useState } from 'react';
import axios from '../api/axiosInstance';

const SalesSummary = ({ filters }) => {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const loadSummary = async () => {
      try {
        const params = new URLSearchParams(filters);
        const res = await axios.get(`/sales/summary/?${params.toString()}`);
        setSummary(res.data);
      } catch (err) {
        console.error('Error loading sales summary:', err);
      }
    };
    loadSummary();
  }, [filters]);

  if (!summary) return null;

  return (
    <div style={{ marginTop: 40 }}>
      <h3>Sales Summary</h3>
      <p>Total Sales: {summary.total_sales}</p>
      <p>Total Quantity: {summary.total_quantity}</p>
      <p>Total Transactions: {summary.total_transactions}</p>
    </div>
  );
};

export default SalesSummary;