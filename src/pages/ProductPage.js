import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import axios from '../api/axiosInstance';
import ProductForm from '../forms/ProductForm';
import ProductTable from '../components/ProductTable';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`/products/list/?search=${search}&page=${page}`);
      setProducts(res.data.results);
      setTotalPages(Math.ceil(res.data.count / 10)); // assuming 10/page
    } catch (err) {
      console.error('Failed to fetch products:', err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [search, page]);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    await axios.delete(`/products/delete/${id}/`);
    fetchProducts();
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  const handleSave = () => {
    setEditingProduct(null);
    fetchProducts();
  };

  return (
    <Layout>
      <h2>Product Management</h2>

      <input
        type="text"
        placeholder="Search by name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: 20, padding: 5 }}
      />

      <ProductForm product={editingProduct} onSave={handleSave} />

      <ProductTable
        products={products}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />

      <div style={{ marginTop: 20 }}>
        Page: {page} / {totalPages}
        <button disabled={page <= 1} onClick={() => setPage(page - 1)}>Prev</button>
        <button disabled={page >= totalPages} onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </Layout>
  );
};

export default ProductPage;