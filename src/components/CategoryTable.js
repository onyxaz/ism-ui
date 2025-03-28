import React from 'react';

const CategoryTable = ({ categories, onEdit, onDelete }) => {
  return (
    <table border="1" cellPadding="10" style={{ width: '100%' }}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {categories.length === 0 ? (
          <tr><td colSpan="3">No categories found.</td></tr>
        ) : (
          categories.map((c) => (
            <tr key={c.id}>
              <td>{c.name}</td>
              <td>{c.description}</td>
              <td>
                <button onClick={() => onEdit(c)}>Edit</button>
                <button onClick={() => onDelete(c.id)}>Delete</button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default CategoryTable;