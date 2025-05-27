import React, { useState } from 'react';
import Modal from './Modal';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import '../css/create.css';

const Create = ({ show, onClose, onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imagePreview, setImagePreview] = useState('');

  const queryClient = useQueryClient();

  const createProduct = (newProduct) => {
    const stored = localStorage.getItem('products');
    const existing = stored ? JSON.parse(stored) : [];
    const updated = [...existing, newProduct];
    localStorage.setItem('products', JSON.stringify(updated));
    return newProduct;
  };

  const mutation = useMutation({
    mutationFn: createProduct,
    onSuccess: (newProduct) => {
      queryClient.setQueryData(['products'], (old = []) => [...old, newProduct]);
      onAdd(newProduct);
      resetForm();
    },
  });

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setPrice('');
    setImagePreview('');
    onClose();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader=new FileReader();
      reader.onloadend=()=>{
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProduct = {
      id: crypto.randomUUID(),
      title: title.trim(),
      description: description.trim(),
      price: parseFloat(price),
      images: [imagePreview],
    };
    mutation.mutate(newProduct);
  };

  return (
    <Modal show={show} onClose={onClose}>
      <h2 style={{ textAlign: 'center' }}>Add Product</h2>
      <form className="create-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <input type="file" onChange={handleImageChange} required />
        {imagePreview && (
          <div className="image">
            <img src={imagePreview} alt="Preview" width="100" />
          </div>
        )}
        <button type="submit" disabled={mutation.isLoading}>
          {mutation.isLoading ? 'Adding...' :'Add'}
          </button>
      </form>
    </Modal>
  );
};

export default Create;

