import axios from 'axios';
import {QueryClient,QueryClientProvider,useQuery,} from '@tanstack/react-query';
import {createContext,useContext,useEffect,useState,} from 'react';

const ProductContext = createContext();
export const useProductContext = () => useContext(ProductContext);

const queryClient = new QueryClient();

const ProductProviderComponent = ({ children }) => {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('products');
    return saved ? JSON.parse(saved) : [];
  });

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  const { data, isSuccess } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await axios.get('https://dummyjson.com/products');
      return res.data.products;
    },
    enabled: products.length === 0 && !sessionStorage.getItem('initialized'),
  });

  useEffect(() => {
    const isFirstLoad = !sessionStorage.getItem('initialized');
    if (isSuccess && data && isFirstLoad) {
      setProducts(data);
      localStorage.setItem('products', JSON.stringify(data));
      localStorage.setItem('initialized', 'true');
    }
  }, [isSuccess, data]);

  useEffect(() => {
  if (products.length > 0) {
    queryClient.setQueryData(['products'], products);
  }
}, [products]);


  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.body.className = theme;
  }, [theme]);

  const handleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const decreaseQuantity = (product) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === product.id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item));
        };

  const getCartTotal = () => {
    return cart
      .reduce((total, product) => total + product.price * product.quantity, 0)
      .toFixed(2);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
        cart,
        setCart,
        addToCart,
        removeFromCart,
        decreaseQuantity,
        getCartTotal,
        theme,
        handleTheme,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const ProductProvider = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    <ProductProviderComponent>{children}</ProductProviderComponent>
  </QueryClientProvider>
);
