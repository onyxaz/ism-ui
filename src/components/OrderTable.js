import React from 'react';

const OrderTable = ({ orders }) => {
  return (
    <table border="1" cellPadding="10" style={{ width: '100%' }}>
      <thead>
        <tr>
          <th>Date</th>
          <th>Customer</th>
          <th>Email</th>
          <th>Address</th>
          <th>Status</th>
          <th>Items</th>
        </tr>
      </thead>
      <tbody>
        {orders.length === 0 ? (
          <tr><td colSpan="6">No orders found.</td></tr>
        ) : (
          orders.map((o) => (
            <tr key={o.id}>
              <td>{new Date(o.timestamp).toLocaleDateString()}</td>
              <td>{o.customer_name}</td>
              <td>{o.customer_email}</td>
              <td>{o.shipping_address}</td>
              <td>{o.status}</td>
              <td>
                <ul>
                  {o.items.map((item, i) => (
                    <li key={i}>
                      {item.product_name} - {item.quantity} x {item.price}
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default OrderTable;