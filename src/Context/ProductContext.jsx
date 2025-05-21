import axios from 'axios';
import {  createContext, useContext, useEffect, useState } from 'react';

const ProductContext=createContext();

export const useProductContext=()=>useContext(ProductContext);

export const ProductProvider=({children})=>{
  const [theme,setTheme]=useState('light');
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('products');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });
  
  useEffect(() => {
    const fetchProducts= async()=>{
      const storedProducts = localStorage.getItem('products');
      if (!storedProducts) {
        try{
          const response=await
          axios.get('https://dummyjson.com/products');
          const productData=response.data.products;
          setProducts(productData);
          localStorage.setItem('products',JSON.stringify(productData));
        } catch(error){
          console.error('error fetching products',error);
        }
      }else{
        setProducts(JSON.parse(storedProducts));
      }
    };
    fetchProducts();
  }, []);
  
  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);
  
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);
  
  const handleTheme=()=>{
    setTheme((prev)=>prev==='light'? 'dark':'light');
  }
  
  useEffect(()=>{
    localStorage.setItem('theme',theme);
    document.body.className=theme;
  },[theme]);
  
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 }: item);
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }});
  };
  
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };
    
  const decreaseQuantity = (product) => {
    setCart((prevCart) => {
      return prevCart.map((item) =>
        item.id === product.id && item.quantity > 1? { ...item, quantity: item.quantity - 1 }: item);
    });
  };
  
  const getCartTotal = () => {
    return cart
    .reduce((total, product) => total + product.price * product.quantity, 0)
    .toFixed(2);
  };

  return(
  <ProductContext.Provider value={{products,setProducts,cart,setCart,addToCart,removeFromCart,decreaseQuantity,getCartTotal,theme,handleTheme}}>
    {children}
  </ProductContext.Provider>
  )
}

