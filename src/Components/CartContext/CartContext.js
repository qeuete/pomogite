import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get('http://localhost:3001/media');
      const itemsInCart = response.data.filter(item => item.cartQuantity > 0);
      setCartItems(itemsInCart);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  const clearCart = async () => {
    try {
      const updatedCartItems = cartItems.map(item => ({ ...item, cartQuantity: 0 }));
      await Promise.all(updatedCartItems.map(item => axios.put(`http://localhost:3001/media/${item.id}`, item)));
      
      setCartItems([]);
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  
  const removeFromCart = async (itemId) => {
    try {
      await axios.patch(`http://localhost:3001/media/${itemId}`, { cartQuantity: 0 });
      
      fetchCartItems();
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };
  
  
  

  const addToCart = async (product) => {
    try {
      const updatedProduct = { ...product, cartQuantity: product.cartQuantity + 1 };
      await axios.put(`http://localhost:3001/media/${product.id}`, updatedProduct);
      setCartItems((prevItems) => {
        const itemIndex = prevItems.findIndex(item => item.id === product.id);
        if (itemIndex > -1) {
          const newItems = [...prevItems];
          newItems[itemIndex] = updatedProduct;
          return newItems;
        }
        return [...prevItems, updatedProduct];
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
