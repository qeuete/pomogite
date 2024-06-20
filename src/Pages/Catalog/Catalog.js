import React, { Component } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import './Catalog.css';
import ProductCard from '../../Components/ProductCard/ProductCard';

class Catalog extends Component {
  state = {
    products: [],
    searchQuery: '',
    selectedCategories: [],
  };

  componentDidMount() {
    this.fetchProducts();
  }

  fetchProducts = () => {
    axios.get('http://localhost:3001/media')
      .then(res => {
        this.setState({ products: res.data });
      })
      .catch(err => console.log(err));
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query });
  };

  handleCategorySelect = (category) => {
    const { selectedCategories } = this.state;
    if (selectedCategories.includes(category)) {
      this.setState({
        selectedCategories: selectedCategories.filter((cat) => cat !== category),
      });
    } else {
      this.setState({ selectedCategories: [...selectedCategories, category] });
    }
  };

  render() {
    const { products, searchQuery, selectedCategories } = this.state;

    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredByCategory = selectedCategories.length
      ? filteredProducts.filter((product) => selectedCategories.includes(product.category))
      : filteredProducts;

    const categorizedProducts = {};
    filteredByCategory.forEach((product) => {
      if (!categorizedProducts[product.category]) {
        categorizedProducts[product.category] = [];
      }
      categorizedProducts[product.category].push(product);
    });

    return (
      <motion.div 
        className="catalog-container"
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 0.5 }} 
      >
        <div className="category-filters">
          <h3>Выберите категории:</h3>
          <div className="category-checkbox-container">
            {['PUMA', 'Nike', 'Converse', 'adidas', 'Reebok', 'Vans'].map((category) => (
              <label className="custom-checkbox-label" key={category}>
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => this.handleCategorySelect(category)}
                />
                <span className="custom-checkbox"></span>
                {category}
              </label>
            ))}
          </div>
        </div>
        <input
          type="text"
          placeholder="Поиск товаров..."
          value={searchQuery}
          onChange={(e) => this.handleSearch(e.target.value)}
        />
        {Object.keys(categorizedProducts).map((category) => (
          <div key={category}>
            <h2>{category}</h2>
            <motion.div 
              className="product-list-grid-container"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }} 
            >
              {categorizedProducts[category].map((product) => (
                <ProductCard key={product.id} data={product} />
              ))}
            </motion.div>
          </div>
        ))}
      </motion.div>
    );
  }
}

export default Catalog;
