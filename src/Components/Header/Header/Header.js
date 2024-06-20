import React, { Component } from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import logo from './logo.png';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../../../Pages/Home/Home';
import Favorites from '../../../Pages/Favorites/Favorites';
import Catalog from '../../../Pages/Catalog/Catalog';
import Basket from '../../../Pages/Basket/Basket';
import ProductDetails from '../../ProductDetails/ProductDetails';
import CreateProducts from '../../../Pages/CreateProducts/CreateProducts';

export default class Header extends Component {
  render() {
    return (
      <Router>
        <>
          <Navbar collapseOnSelect expand="md" bg="light" variant="light">
            <Container>
              <Navbar.Brand href="/">
                <img
                  src={logo}
                  height="100"
                  width="300"
                  className="d-inline-block align-top"
                  alt="Logo" />
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                  <Nav.Link href="/"> Главная </Nav.Link>
                  <Nav.Link href="/catalog"> Каталог </Nav.Link>
                  <Nav.Link href="/favorites"> Избранное </Nav.Link>
                  <Nav.Link href="/basket"> Корзина </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
          
          <Routes>
            <Route path='/' element={< Home />} />
            <Route path='/catalog' element={< Catalog />} />
            <Route path='/favorites' element={< Favorites />} />
            <Route path='/basket' element={< Basket />} />
            <Route path='/product/:productId' element={< ProductDetails />} />
            <Route path='/createproductshDJIWMVuvejdmWOEu812341' element={< CreateProducts />} />
          </Routes>
        </>
      </Router>
    );
  }
}
