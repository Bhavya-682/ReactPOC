import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Products from "./components/Read";
import Signup from "./components/Signup";

const App = () => {
  return (
    <Router>
      <nav>
        <Link className="product" to="/">
          products
        </Link>
        <Link className="signup" to="signup">
          sign up
        </Link>
        <Link className="cart" to="cart">
          cart
        </Link>
      </nav>
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cart" element={<cart />} />
      </Routes>
    </Router>
  );
};

export default App;
