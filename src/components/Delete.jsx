import React from 'react';
import Modal from './Modal';
import '../css/delete.css'
 
const Delete = ({ show, onClose, product, onDelete }) => {
  if (!product) return null;
 
  const handleDelete = () => {
onDelete(product.id);
    onClose();
  };
 
  return (
    <Modal show={show} onClose={onClose}>
      <h2>Are you sure you want to delete "{product.title}"?</h2>
      <div className='delete-button'>
        <button type="submit" onClick={handleDelete}>Yes</button>
        <button onClick={onClose}>No</button>
      </div>
    </Modal>
  );
};
 
export default Delete;
