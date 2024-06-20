import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import './CreateProducts.css';

const API_URL = 'http://localhost:3001/media';

export default function CreateProducts() {
  const { register, handleSubmit, reset, setValue } = useForm();
  const [productId, setProductId] = useState('');
  const [isUpdate, setIsUpdate] = useState(false);

  const onSubmit = (data) => {
    if (isUpdate) {
      updateProduct(data);
    } else {
      addProduct(data);
    }
  };

  const addProduct = (data) => {
    axios.post(API_URL, data)
      .then(() => {
        console.log('Product added successfully');
        reset(); 
      })
      .catch(error => {
        console.error('Failed to add product:', error);
      });
  };

  const updateProduct = (data) => {
    axios.put(`${API_URL}/${productId}`, data)
      .then(() => {
        console.log('Product updated successfully');
        reset(); 
        setProductId('');
        setIsUpdate(false);
      })
      .catch(error => {
        console.error('Failed to update product:', error);
      });
  };

  const deleteProduct = () => {
    axios.delete(`${API_URL}/${productId}`)
      .then(() => {
        console.log('Product deleted successfully');
        reset();
        setProductId('');
        setIsUpdate(false);
      })
      .catch(error => {
        console.error('Failed to delete product:', error);
      });
  };

  const handleEdit = () => {
    axios.get(`${API_URL}/${productId}`)
      .then((response) => {
        const product = response.data;
        setValue('name', product.name);
        setValue('description', product.description);
        setValue('url', product.url);
        setValue('price', product.price);
        setValue('category', product.category);
        setValue('isFavorite', product.isFavorite);
        setValue('cartQuantity', product.cartQuantity);
        setIsUpdate(true);
      })
      .catch(error => {
        console.error('Failed to fetch product:', error);
      });
  };

  return (
    <Container className="form-container">
      <h2>{isUpdate ? 'Обновить товар' : 'Добавить новый продукт'}</h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="productId" className="form-group">
          <Form.Label className="form-label">ID продукта</Form.Label>
          <Form.Control
            type="text"
            placeholder="Введите ID продукта"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            className="form-control"
          />
          <Button variant="secondary" onClick={handleEdit}>
            Редактировать
          </Button>
        </Form.Group>
        <Form.Group controlId="productName" className="form-group">
          <Form.Label className="form-label">Название продукта</Form.Label>
          <Form.Control
            type="text"
            placeholder="Введите название продукта"
            {...register('name')}
            className="form-control"
          />
        </Form.Group>
        <Form.Group controlId="productDescription" className="form-group">
          <Form.Label className="form-label">Описание</Form.Label>
          <Form.Control
            type="text"
            placeholder="Введите описание продукта"
            {...register('description')}
            className="form-control"
          />
        </Form.Group>
        <Form.Group controlId="productUrl" className="form-group">
          <Form.Label className="form-label">URL изображения</Form.Label>
          <Form.Control
            type="text"
            placeholder="Введите URL изображения"
            {...register('url')}
            className="form-control"
          />
        </Form.Group>
        <Form.Group controlId="productPrice" className="form-group">
          <Form.Label className="form-label">Цена</Form.Label>
          <Form.Control
            type="number"
            placeholder="Введите цену продукта"
            {...register('price')}
            className="form-control"
          />
        </Form.Group>
        <Form.Group controlId="productCategory" className="form-group">
          <Form.Label className="form-label">Категория</Form.Label>
          <Form.Control
            type="text"
            placeholder="Введите категорию продукта"
            {...register('category')}
            className="form-control"
          />
        </Form.Group>
        <Form.Group controlId="productIsFavorite" className="form-group">
          <Form.Label className="form-label">Избранное</Form.Label>
          <Form.Check
            type="checkbox"
            {...register('isFavorite')}
            className="form-check-input"
          />
        </Form.Group>
        <Form.Group controlId="productCartQuantity" className="form-group">
          <Form.Label className="form-label">Количество в корзине</Form.Label>
          <Form.Control
            type="number"
            placeholder="Введите количество в корзине"
            {...register('cartQuantity')}
            className="form-control"
          />
        </Form.Group>
        <div className="button-container">
          <Button variant="primary" type="submit">
            {isUpdate ? 'Обновить продукт' : 'Создать продукт'}
          </Button>
          <Button variant="danger" onClick={deleteProduct}>
            Удалить продукт
          </Button>
        </div>
      </Form>
    </Container>
  );
}
