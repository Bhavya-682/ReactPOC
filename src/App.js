import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Products from "./components/Read";
import Signup from "./components/Signup";
import Cart from "./components/Cart";
import { ProductProvider } from "./Context/ProductContext";

const App = () => {
  return (
    <ProductProvider>
      <Router>
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
        </nav>

        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Router>
    </ProductProvider>
  );
};

export default App;
