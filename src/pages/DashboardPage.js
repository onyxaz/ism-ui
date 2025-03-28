import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import axios from '../api/axiosInstance';

const DashboardPage = () => {
  const [salesSummary, setSalesSummary] = useState(null);
  const [expenseSummary, setExpenseSummary] = useState(null);
  const [lowStockAlerts, setLowStockAlerts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [salesRes, expensesRes, inventoryRes] = await Promise.all([
          axios.get('/sales/summary/'),
          axios.get('/business-expenses/summary/'),
          axios.get('/inventory/logs/?action=low_stock'),
        ]);

        setSalesSummary(salesRes.data);
        setExpenseSummary(expensesRes.data);
        setLowStockAlerts(inventoryRes.data.results || []);
      } catch (err) {
        console.error('Failed to load dashboard data:', err);
      }
    };

    fetchData();
  }, []);

  return (
    <Layout>
      <h2>Dashboard</h2>

      <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
        <Widget title="Total Sales" value={salesSummary?.total_sales || 0} />
        <Widget title="Total Expenses" value={expenseSummary?.total_expenses || 0} />
        <Widget title="Net Income" value={(salesSummary?.total_sales || 0) - (expenseSummary?.total_expenses || 0)} />
      </div>

      <h3>Low Stock Alerts</h3>
      {lowStockAlerts.length === 0 ? (
        <p>No low stock items.</p>
      ) : (
        <ul>
          {lowStockAlerts.map((log) => (
            <li key={log.id}>
              {log.product_name} - Remaining: {log.current_quantity}
            </li>
          ))}
        </ul>
      )}
    </Layout>
  );
};

const Widget = ({ title, value }) => (
  <div style={{ padding: 20, background: '#f9f9f9', border: '1px solid #ccc', borderRadius: 6, width: 200 }}>
    <h4>{title}</h4>
    <p style={{ fontSize: 24 }}>{value}</p>
  </div>
);

export default DashboardPage;