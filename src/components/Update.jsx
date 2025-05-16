import React from 'react';
import Modal from './Modal'; 
import '../css/update.css';

const Update = ({ show, onClose, product, onUpdate }) => {
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
    onUpdate(updatedProduct);
    onClose();
  };

  return (
    <Modal show={show} onClose={onClose}>
      <h2>Update Product</h2>
      <form className="delete-form" onSubmit={handleSubmit}>
        <label>
          Title:
          <input style={{width:"96%"}} type="text" name="title" defaultValue={product.title} required />
        </label>
        <label>
          Description:
          <input style={{width:"96%"}} type="text" name="description" defaultValue={product.description} required />
        </label>
        <label>
          Price:
          <input style={{width:"96%"}} type="number" name="price" defaultValue={product.price} required />
        </label>
        {product.images && product.images.length > 0 && (
          <div>
            <img src={product.images[0]} alt={product.title} width="100" height="100" />
          </div>
        )}
        <button type="submit">Update</button>
      </form>
    </Modal>
  );
};

export default Update;
