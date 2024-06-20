import React, { useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion'; // Импортируем motion из Framer Motion
import './ProductDetails.css';
import { CartContext } from '../CartContext/CartContext';

const ProductDetails = () => {
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const productData = location.state && location.state.product;
    setProduct(productData);
    if (productData) {
      setIsFavorite(productData.isFavorite || false);
    }
  }, [location.state]);

  const handleAddToCart = () => {
    addToCart(product);
  };

  const toggleFavorite = () => {
    const updatedFavoriteStatus = !isFavorite;
    setIsFavorite(updatedFavoriteStatus);
    axios.put(`http://localhost:3001/media/${product.id}`, { ...product, isFavorite: updatedFavoriteStatus })
      .then(res => {
        // Обработать успешный ответ, если необходимо
      })
      .catch(err => console.log(err));
  };

  if (!product) {
    return <div>No product data available</div>;
  }

  const { name, description, url, price, color } = product;

  return (
    <div className="product-details-container">
      <form className="product-details-form">
        <motion.div 
          className="product-details-content"
          initial={{ opacity: 0 }} // Начальное значение прозрачности
          animate={{ opacity: 1 }} // Анимация появления при первоначальном рендере
          transition={{ duration: 0.5 }} // Длительность анимации
        >
          <div className="product-details-info">
            <h1 className="product-details-title">{name}</h1>
            <div className="product-details-image-container">
              <img src={url} alt={`Фото ${name}`} className="product-details-image" />
            </div>
            <p><strong>Описание:</strong> {description}</p>
            <div className="price-buy-container">
              <div className="price-container">
                <p><strong>Цена:</strong> {price} руб.</p>
              </div>
              <motion.button 
                type="button" 
                className="buy-button"
                whileHover={{ scale: 1.1 }} // Увеличение размера при наведении мыши
                whileTap={{ scale: 0.9 }} // Уменьшение размера при нажатии
                onClick={handleAddToCart}
              >
                Купить
              </motion.button>
              {color && color.map((c, index) => (
                <button key={index} className="color-button">{c}</button>
              ))}
            </div>
            <motion.button 
              type="button" 
              className="favorite-button-new" 
              onClick={toggleFavorite}
              whileHover={{ scale: 1.1 }} // Увеличение размера при наведении мыши
              whileTap={{ scale: 0.9 }} // Уменьшение размера при нажатии
            >
              {isFavorite ? '❤️ Добавлено в избранное' : '🤍 Добавить в избранное'}
            </motion.button>
          </div>
        </motion.div>
      </form>
    </div>
  );
};

export default ProductDetails;
