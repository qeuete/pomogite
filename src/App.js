import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Components/Header/Header/Header';
import Footer from './Components/Header/Footer/Footer';
import { CartProvider } from './Components/CartContext/CartContext';

function App() {
  return (
    <CartProvider>
      <Header />
      <Footer />
    </CartProvider>
  );
}

export default App;
