import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import axios from '../api/axiosInstance';

const OrderForm = ({ onCreate }) => {
  const { register, control, handleSubmit, reset } = useForm({
    defaultValues: {
      customer_name: '',
      customer_email: '',
      shipping_address: '',
      items: [{ product_id: '', quantity: '', price: '' }]
    }
  });

  const { fields, append, remove } = useFieldArray({ control, name: 'items' });

  const onSubmit = async (data) => {
    try {
      await axios.post('/orders/create/', data);
      reset();
      onCreate();
    } catch (err) {
      alert('Failed to create order.');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ marginBottom: 20 }}>
      <h4>Customer Info</h4>
      <input {...register('customer_name')} placeholder="Customer Name" required />
      <input {...register('customer_email')} placeholder="Customer Email" />
      <input {...register('shipping_address')} placeholder="Shipping Address" />

      <h4>Order Items</h4>
      {fields.map((item, index) => (
        <div key={item.id} style={{ marginBottom: 10 }}>
          <input {...register(`items.${index}.product_id`)} placeholder="Product ID" required />
          <input {...register(`items.${index}.quantity`)} type="number" placeholder="Qty" required />
          <input {...register(`items.${index}.price`)} type="number" placeholder="Price" required />
          <button type="button" onClick={() => remove(index)}>Remove</button>
        </div>
      ))}
      <button type="button" onClick={() => append({ product_id: '', quantity: '', price: '' })}>
        Add Item
      </button>

      <br /><br />
      <button type="submit">Create Order</button>
    </form>
  );
};

export default OrderForm;