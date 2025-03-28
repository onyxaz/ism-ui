import React, { useContext } from 'react';
import AuthContext from '../auth/AuthContext';

const ProductTable = ({ products, onEdit, onDelete }) => {
  const { auth } = useContext(AuthContext);
  const isAdmin = auth?.isAdmin;

  return (
    <div className="overflow-x-auto">
      <table className="w-full border border-gray-300 rounded-md">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-3">Name</th>
            <th className="p-3">Price</th>
            <th className="p-3">Category</th>
            <th className="p-3">Description</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan="5" className="p-4 text-center text-gray-500">
                No products found.
              </td>
            </tr>
          ) : (
            products.map((p) => (
              <tr key={p.id} className="border-t border-gray-200">
                <td className="p-3">{p.name}</td>
                <td className="p-3">{p.price}</td>
                <td className="p-3">{p.category}</td>
                <td className="p-3">{p.description}</td>
                <td className="p-3 space-x-2">
                  <button
                    onClick={() => onEdit(p)}
                    disabled={!isAdmin}
                    className={`px-3 py-1 rounded text-white ${
                      isAdmin ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-300 cursor-not-allowed'
                    }`}
                    title={isAdmin ? 'Edit Product' : 'Admins only'}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(p.id)}
                    disabled={!isAdmin}
                    className={`px-3 py-1 rounded text-white ${
                      isAdmin ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-300 cursor-not-allowed'
                    }`}
                    title={isAdmin ? 'Delete Product' : 'Admins only'}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;