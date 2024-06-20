import axios from 'axios';

const handleOrderSubmit = (orderData) => {
  axios.post('http://localhost:3002/orders', orderData)
    .then(response => {
      console.log(response.data);
      alert('Заказ успешно оформлен и письмо отправлено');
    })
    .catch(error => {
      console.error('Ошибка при оформлении заказа:', error);
      alert('Ошибка при оформлении заказа. Попробуйте еще раз.');
    });
};

// Пример данных заказа
const orderData = {
  name: 'Иван Иванов',
  address: 'ул. Пушкина, д. Колотушкина',
  paymentMethod: 'Кредитная карта',
  cartItems: [
    { name: 'Товар 1', price: 1000, cartQuantity: 2 },
    { name: 'Товар 2', price: 2000, cartQuantity: 1 }
  ],
  totalPrice: 4000
};