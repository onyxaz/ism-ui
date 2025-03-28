import React from 'react';

const SalesTable = ({ sales }) => {
  return (
    <table border="1" cellPadding="10" style={{ width: '100%' }}>
      <thead>
        <tr>
          <th>Date</th>
          <th>Product</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Total</th>
          <th>Payment</th>
          <th>User</th>
        </tr>
      </thead>
      <tbody>
        {sales.length === 0 ? (
          <tr><td colSpan="7">No sales found.</td></tr>
        ) : (
          sales.map((sale) => (
            <tr key={sale.id}>
              <td>{new Date(sale.timestamp).toLocaleString()}</td>
              <td>{sale.product_name}</td>
              <td>{sale.quantity}</td>
              <td>{sale.price}</td>
              <td>{sale.total}</td>
              <td>{sale.payment_method}</td>
              <td>{sale.user_name}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default SalesTable;