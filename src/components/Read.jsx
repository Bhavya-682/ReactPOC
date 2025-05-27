import { useProductContext } from '../Context/ProductContext';
import { useState } from 'react';
import Update from './Update';
import Delete from './Delete';
import Create from './Create';
import '../css/read.css';

const Read = () => {
  const { products, setProducts, addToCart } = useProductContext();

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleUpdateClick = (product) => {
    setSelectedProduct(product);
    setShowUpdateModal(true);
  };

  const handleDeleteClick = (product) => {
    setSelectedProduct(product);
    setShowDeleteModal(true);
  };

  const handleAddClick = () => {
    setShowAddModal(true);
  };

  const closeModal = () => {
    setShowUpdateModal(false);
    setShowDeleteModal(false);
    setShowAddModal(false);
    setSelectedProduct(null);
  };

  const handleUpdateProduct = (updatedProduct) => {
    const updated = products.map((p) =>
      p.id === updatedProduct.id ? updatedProduct : p
    );
    setProducts(updated);
    localStorage.setItem('products', JSON.stringify(updated));
    closeModal();
  };

  const handleDeleteProduct = (productId) => {
    const updated = products.filter((p) => p.id !== productId);
    setProducts(updated);
    localStorage.setItem('products', JSON.stringify(updated));
    closeModal();
  };

  const handleAddProduct = (newProduct) => {
    const updated = [...products, newProduct];
    setProducts(updated);
    closeModal();
  };

  return (
    <div className="read-container">
      <h1>Products</h1>
      <button className="add-button" onClick={handleAddClick}>
        Add Product
      </button>

      <ul className="product-list">
        {products.map((product) => (
          <li key={product.id} className="product-item">
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            {product.images && product.images.length > 0 && (
              <img
                src={product.images[0]}
                alt={product.title}
                width="100"
                height="100"
              />
            )}
            <div className="button-prod">
              <button onClick={() => handleUpdateClick(product)}>Update</button>
              <button onClick={() => handleDeleteClick(product)}>Delete</button>
              <button onClick={() => addToCart(product)}>Add to Cart</button>
            </div>
          </li>
        ))}
      </ul>

      <Update
        show={showUpdateModal}
        onClose={closeModal}
        product={selectedProduct}
        onUpdate={handleUpdateProduct}
      />

      <Delete
        show={showDeleteModal}
        onClose={closeModal}
        product={selectedProduct}
        onDelete={handleDeleteProduct}
      />

      <Create
        show={showAddModal}
        onClose={closeModal}
        onAdd={handleAddProduct}
      />
    </div>
  );
};

export default Read;





