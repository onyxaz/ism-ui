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
      <h2 className="text-2xl font-bold mb-6">📊 Dashboard</h2>

      {/* Summary Widgets */}
      <div className="flex flex-wrap gap-6 mb-10">
        <Widget title="Total Sales" value={salesSummary?.total_sales || 0} color="bg-blue-100" />
        <Widget title="Total Expenses" value={expenseSummary?.total_expenses || 0} color="bg-yellow-100" />
        <Widget
          title="Net Income"
          value={(salesSummary?.total_sales || 0) - (expenseSummary?.total_expenses || 0)}
          color="bg-green-100"
        />
      </div>

      {/* Stock Alerts */}
      <div className="bg-white rounded shadow p-6">
        <h3 className="text-lg font-semibold mb-4 text-red-600">⚠️ Low Stock Alerts</h3>
        {lowStockAlerts.length === 0 ? (
          <p className="text-gray-500">No low stock items.</p>
        ) : (
          <ul className="list-disc pl-5 space-y-2">
            {lowStockAlerts.map((log) => (
              <li key={log.id} className="text-sm text-gray-700">
                <span className="font-medium text-red-700">{log.product_name}</span> – Remaining: <strong>{log.current_quantity}</strong>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Layout>
  );
};

const Widget = ({ title, value, color }) => (
  <div className={`rounded shadow p-6 w-64 text-center ${color}`}>
    <h4 className="text-sm font-semibold text-gray-700">{title}</h4>
    <p className="text-3xl font-bold mt-2 text-gray-800">{value}</p>
  </div>
);

export default DashboardPage;