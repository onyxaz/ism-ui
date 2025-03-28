import React from 'react';

const VendorTable = ({ vendors, onEdit, onDelete }) => {
  return (
    <table border="1" cellPadding="10" style={{ width: '100%' }}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Address</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {vendors.length === 0 ? (
          <tr><td colSpan="5">No vendors found.</td></tr>
        ) : (
          vendors.map((v) => (
            <tr key={v.id}>
              <td>{v.name}</td>
              <td>{v.email}</td>
              <td>{v.phone}</td>
              <td>{v.address}</td>
              <td>
                <button onClick={() => onEdit(v)}>Edit</button>
                <button onClick={() => onDelete(v.id)}>Delete</button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default VendorTable;