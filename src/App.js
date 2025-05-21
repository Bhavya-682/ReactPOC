import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Products from "./components/Read";
import Signup from "./components/Signup";
import Cart from "./components/Cart";
import { ProductProvider } from "./Context/ProductContext";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <ProductProvider>
      <Router>
        <Navbar />
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
