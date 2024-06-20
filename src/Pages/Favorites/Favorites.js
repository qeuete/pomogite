import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Favorites.css';
import ProductCard from '../../Components/ProductCard/ProductCard';

const Favorites = () => {
  const [favoriteProducts, setFavoriteProducts] = useState([]);

  const fetchFavorites = () => {
    axios.get('http://localhost:3001/media')
      .then(res => {
        const favorites = res.data.filter(product => product.isFavorite);
        setFavoriteProducts(favorites);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const handleFavoriteChange = (id, isFavorite) => {
    if (!isFavorite) {
      setFavoriteProducts(prevFavorites => prevFavorites.filter(product => product.id !== id));
    } else {
      fetchFavorites();
    }
  };

  return (
    <div className="favorites-container">
      <h1>Избранные товары</h1>
      <div className="favorites-cards">
        {favoriteProducts.map((product) => (
          <ProductCard key={product.id} data={product} onFavoriteChange={handleFavoriteChange} />
        ))}
      </div>
    </div>
  );
}

export default Favorites;
