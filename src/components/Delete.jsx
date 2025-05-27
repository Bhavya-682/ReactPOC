import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Modal from './Modal';
import '../css/delete.css';

const Delete = ({ show, onClose, product, onDelete }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (productId) => {
      const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
      const updated = storedProducts.filter((p) => p.id !== productId);
      localStorage.setItem('products', JSON.stringify(updated));
      return productId;
    },
    onSuccess: (deletedId) => {
      queryClient.setQueryData(['products'], (old = []) =>
        old.filter((p) => p.id !== deletedId)
      );
      onDelete(deletedId);
      onClose(); 
    },
  });

  if (!product) return null;

  const handleDelete = () => {
    mutation.mutate(product.id);
  };

  return (
    <Modal show={show} onClose={onClose}>
      <h2>Are you sure you want to delete "{product.title}"?</h2>
      <div className="delete-button">
        <button type="button" onClick={handleDelete} disabled={mutation.isLoading}>
          {mutation.isLoading ? 'Deleting...' : 'Yes'}
        </button>
        <button type="button" onClick={onClose}>No</button>
      </div>
    </Modal>
  );
};

export default Delete;
