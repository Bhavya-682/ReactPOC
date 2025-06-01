import React from 'react';
import { Link } from 'react-router-dom';
import { useProductContext } from '../Context/ProductContext';

const Navbar = () => {
    const {handleTheme}=useProductContext();
  return (
    <div>
       <nav>
          <Link className="product" to="/">
            products
          </Link>
          <Link className="cart" to="cart">
            cart
          </Link>
          <Link className="signup" to="signup">
            sign up
          </Link>
          <button onClick={handleTheme}>Toggle</button>
        </nav>
    </div>
  );
};

export default Navbar;
