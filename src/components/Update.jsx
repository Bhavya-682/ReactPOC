import React from 'react';
import { useMutation } from '@tanstack/react-query';
import Modal from './Modal';
import '../css/update.css';
 
const Update = ({ show, onClose, product, onUpdate }) => {
  const mutation = useMutation({
    mutationFn: (updatedProduct) => {
      const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
      const updated = storedProducts.map((p) =>
        p.id === updatedProduct.id ? updatedProduct : p
      );
      localStorage.setItem('products', JSON.stringify(updated));
      return updatedProduct;
    },
    onSuccess: (data) => {
      onUpdate(data);
      onClose();
    },
  });

  if (!show) return null;
 
  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedProduct = {
      id: product.id,
      title: e.target.title.value,
      description: e.target.description.value,
      price: e.target.price.value,
      images: product.images,
    };
    mutation.mutate(updatedProduct);
  };
 
  return (
    <Modal show={show} onClose={onClose}>
      <h2>Update Product</h2>
      <form className="delete-form" onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            style={{ width: '96%' }}
            type="text"
            name="title"
            defaultValue={product.title}
            required
          />
        </label>
        <label>
          Description:
          <input
            style={{ width: '96%' }}
            type="text"
            name="description"
            defaultValue={product.description}
            required
          />
        </label>
        <label>
          Price:
          <input
            style={{ width: '96%' }}
            type="number"
            name="price"
            defaultValue={product.price}
            required
          />
        </label>
        {product.images && product.images.length > 0 && (
          <div>
            <img
              src={product.images[0]}
              alt={product.title}
              width="100"
              height="100"
            />
          </div>
        )}
        <button type="submit">Update</button>
      </form>
    </Modal>
  );
};
 
export default Update;
 