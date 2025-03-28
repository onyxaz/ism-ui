import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import axios from '../api/axiosInstance';
import CategoryForm from '../forms/CategoryForm';
import CategoryTable from '../components/CategoryTable';

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`/categories/list/?search=${search}&page=${page}`);
      setCategories(res.data.results);
      setTotalPages(Math.ceil(res.data.count / 10));
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [search, page]);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this category?')) return;
    await axios.delete(`/categories/delete/${id}/`);
    fetchCategories();
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
  };

  const handleSave = () => {
    setEditingCategory(null);
    fetchCategories();
  };

  return (
    <Layout>
      <h2>Category Management</h2>

      <input
        type="text"
        placeholder="Search categories..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: 20, padding: 5 }}
      />

      <CategoryForm category={editingCategory} onSave={handleSave} />

      <CategoryTable
        categories={categories}
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

export default CategoryPage;