import React from 'react';

const ExpenseTable = ({ expenses }) => {
  return (
    <table border="1" cellPadding="10" style={{ width: '100%' }}>
      <thead>
        <tr>
          <th>Date</th>
          <th>Vendor</th>
          <th>Type</th>
          <th>Amount</th>
          <th>Note</th>
        </tr>
      </thead>
      <tbody>
        {expenses.length === 0 ? (
          <tr><td colSpan="5">No expenses found.</td></tr>
        ) : (
          expenses.map((exp) => (
            <tr key={exp.id}>
              <td>{new Date(exp.timestamp).toLocaleDateString()}</td>
              <td>{exp.vendor}</td>
              <td>{exp.type}</td>
              <td>{exp.amount}</td>
              <td>{exp.note}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default ExpenseTable;