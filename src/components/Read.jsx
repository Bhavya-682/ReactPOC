import { useProductContext } from '../Context/ProductContext';
import { useState } from 'react';
import Update from './Update';
import Delete from './Delete';
import Create from './Create'; 
import '../css/Read.css';

const Read = () => {
 
  const { products, setProducts,addToCart } = useProductContext();

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
    setProducts(products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)));
    closeModal();
  };

  const handleDeleteProduct = (productId) => {
    setProducts(products.filter((p) => p.id !== productId));
    closeModal();
  };

  const handleAddProduct = (newProduct) => {
    setProducts([...products, newProduct]);
    closeModal();
  };

  return (
    <div className="read-container">
      <h1>Products</h1>
      <button className="add-button" onClick={handleAddClick}>Add Product</button>
      <ul className="product-list">
        {products.map((product) => (
          <li key={product.id} className="product-item">
            <p style={{color:"black"}}>{product.name} </p>
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
              <button onClick={()=> addToCart(product)}>Add to Cart</button>
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
