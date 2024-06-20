import React, { useState, useEffect } from 'react';
import './Home.css';
import axios from 'axios';
import ProductCard from '../../Components/ProductCard/ProductCard';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [setItems] = useState([]); 
  const [setTotalPrice] = useState(0); 

  const addToCart = (product) => {
    setItems(prevItems => [...prevItems, product]);
    setTotalPrice(prevPrice => prevPrice + product.price);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!name) newErrors.name = 'Имя обязательно';
    if (!email) newErrors.email = 'Email обязателен';
    if (!message) newErrors.message = 'Сообщение обязательно';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Message:', message);
  
    axios.post('http://localhost:3003/home', { name, email, message })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error('Failed to send message.', error);
      });
  };

  const fetchProducts = () => {
    axios.get('http://localhost:3001/media')
      .then(res => {
        const randomProducts = res.data.sort(() => 0.5 - Math.random()).slice(0, 10); // Getting 10 random products
        setProducts(randomProducts);
      })
      .catch(err => console.log(err));
  };

  const handleFavoriteChange = (id, isFavorite) => {
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === id ? { ...product, isFavorite } : product
      )
    );
  };

  return (
    <div className="home-container">
      <div className="product-cards-container">
        {products.map(product => (
          <ProductCard key={product.id} data={product} onFavoriteChange={handleFavoriteChange} onAddToCart={addToCart} />
        ))}
      </div>

      <div className="feedback-form">
        <h2>Форма обратной связи</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name" className="form-group">Имя:</label>
            <input 
              type="text"
              id="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="form-group-input"
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="message">Сообщение:</label>
            <textarea
              id="message"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
            ></textarea>
            {errors.message && <span className="error">{errors.message}</span>}
          </div>
          <button type="submit">Отправить</button>
        </form>
      </div>
    </div>
  );
};

export default Home;
