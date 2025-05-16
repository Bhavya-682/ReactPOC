import React, { useState } from 'react';
import Modal from './Modal';
import '../css/create.css';

const Create = ({ show, onClose, onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imagePreview, setImagePreview] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProduct = {
      id: crypto.randomUUID(),
      title,
      description,
      price,
      images: [imagePreview]
    };

    onAdd(newProduct);
    setTitle('');
    setDescription('');
    setPrice('');
    setImagePreview('');
    onClose();
  };

  return (
    <Modal show={show} onClose={onClose}>
      <h2 style={{textAlign:"center"}}>Add Product</h2>
      <form className="create-form" onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
        <input type="file" onChange={handleImageChange} required />
        {imagePreview && (
          <div className="image">
            <img src={imagePreview} alt="Preview" width="100" />
          </div>
        )}
        <button type="submit">Add</button>
      </form>
    </Modal>
  );
};

export default Create;
