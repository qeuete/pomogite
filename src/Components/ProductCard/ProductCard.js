import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion'; 
import './ProductCard.css';
import { CartContext } from '../CartContext/CartContext';

const ProductCard = ({ data, onFavoriteChange }) => {
  const [isFavorite, setIsFavorite] = useState(data?.isFavorite || false);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const formatPrice = (price) => {
    const formattedPrice = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return formattedPrice + " руб.";
  };

  const toggleFavorite = () => {
    const updatedFavoriteStatus = !isFavorite;
    setIsFavorite(updatedFavoriteStatus);
    axios.put(`http://localhost:3001/media/${data.id}`, { ...data, isFavorite: updatedFavoriteStatus })
      .then(res => {
        onFavoriteChange(data.id, updatedFavoriteStatus);
      })
      .catch(err => console.log(err));
  };

  const handleAddToCart = () => {
    addToCart(data);
    console.log('Товар добавлен в корзину:', data);
  };

  const trimmedName = data.name.length > 30 ? data.name.slice(0, 30) + '...' : data.name;

  return (
    <motion.div 
      className="product-card"
      whileHover={{ scale: 1.05 }} 
      whileTap={{ scale: 0.95 }} 
    >
      <img src={data.url} alt={`Фото ${data.name}`} className="product-image" />
      <h2 className="product-title">{trimmedName}</h2>
      <p className="product-price">Цена: {formatPrice(data.price)}</p>
      <div className="product-buttons">
        <motion.button 
          className="buy-button"
          whileHover={{ scale: 1.1 }} 
          whileTap={{ scale: 0.9 }}
          onClick={handleAddToCart}
        >
          Купить
        </motion.button>
        <motion.button 
          className="description-button" 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }} 
          onClick={() => navigate(`/product/${data.id}`, { state: { product: data } })}
        >
          Подробнее
        </motion.button>
      </div>
      <motion.button 
        className="favorite-button"
        whileHover={{ scale: 1.1 }} 
        whileTap={{ scale: 0.9 }} 
        onClick={toggleFavorite}
      >
        {isFavorite ? '❤️' : '🤍'}
      </motion.button>
    </motion.div>
  );
};

export default ProductCard;
