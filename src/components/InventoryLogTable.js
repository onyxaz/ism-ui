import React from 'react';

const InventoryLogTable = ({ logs }) => {
  return (
    <table border="1" cellPadding="10" style={{ width: '100%' }}>
      <thead>
        <tr>
          <th>Date</th>
          <th>Product</th>
          <th>Action</th>
          <th>Quantity</th>
          <th>Remaining</th>
          <th>Note</th>
        </tr>
      </thead>
      <tbody>
        {logs.length === 0 ? (
          <tr><td colSpan="6">No logs found.</td></tr>
        ) : (
          logs.map((log) => (
            <tr key={log.id}>
              <td>{new Date(log.timestamp).toLocaleString()}</td>
              <td>{log.product_name}</td>
              <td>{log.action}</td>
              <td>{log.quantity}</td>
              <td>{log.current_quantity}</td>
              <td>{log.note}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default InventoryLogTable;