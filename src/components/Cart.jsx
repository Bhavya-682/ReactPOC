import React from 'react';
import { useProductContext } from '../Context/ProductContext';
import { Link } from 'react-router-dom';
import '../css/cart.css';  

const Cart = () => {
  const { cart, removeFromCart, getCartTotal, addToCart, decreaseQuantity } = useProductContext();

  const handleIncreaseQuantity = (product) => {
    addToCart(product);  
  };

  const handleDecreaseQuantity = (product) => {
    if (product.quantity > 1) {
      decreaseQuantity(product); 
    }
  };

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          {cart.map(product => (
            <div key={product.id} className="cart-item">
              <img src={product.images} alt={product.title} />
              <h3>{product.title}</h3>
              <p>${product.price}</p>
              <img src={product.images?.[0]} alt={product.title} />


              <div className="quantity-controls">
                <button onClick={() => handleDecreaseQuantity(product)}>-</button>
                <p>Quantity: {product.quantity}</p>
                <button onClick={() => handleIncreaseQuantity(product)}>+</button>
              </div>

              <button onClick={() => removeFromCart(product.id)}>Remove from Cart</button>
            </div>
          ))}
          <div className="cart-total">
            <h3>Total: ${getCartTotal()}</h3>
          </div>
        </div>
      )}
      <Link to="/">Continue Shopping</Link>
    </div>
  );
};

export default Cart;
