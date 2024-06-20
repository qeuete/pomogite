const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = 3002;

app.use(bodyParser.json());
app.use(cors()); // Разрешить CORS

// Настройка транспортера для отправки писем
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Маршрут для обработки заказов
app.post('/orders', (req, res) => {
  const { name, address, paymentMethod, cartItems, totalPrice } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_USER, // Замените на вашу почту
    to: process.env.EMAIL_USER, // Замените на почту получателя
    subject: 'Подтверждение заказа',
    text: `ФИО: ${name}\nАдрес: ${address}\nСпособ оплаты: ${paymentMethod}\nОбщая стоимость: ${totalPrice} руб.\n\nТовары:\n${cartItems.map(item => `${item.name} - ${item.price} руб. x ${item.cartQuantity}`).join('\n')}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).send('Ошибка при отправке письма');
    }
    res.status(200).send('Заказ успешно оформлен и письмо отправлено');
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});