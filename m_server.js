const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 3002;

app.use(bodyParser.json());
app.use(cors());

app.post('/orders', (req, res) => {
  const { name, address, paymentMethod, cartItems, totalPrice } = req.body;
  console.log('Order received:', { name, address, paymentMethod, cartItems, totalPrice });

  const transporter = nodemailer.createTransport({
    service: 'gmail', // или любой другой SMTP-сервер
    auth: {
      user: 'isip_e.o.murlaeva@mpt.ru', // ваш email
      pass: 'weeweeblin', // ваш пароль
    },
  });

  const mailOptions = {
    from: 'isip_e.o.murlaeva@mpt.ru', // ваш email
    to: 'isip_e.o.murlaeva@mpt.ru', // email получателя
    subject: 'Ваш заказ успешно оформлен',
    text: `Ваш заказ успешно оформлен.
ФИО: ${name}
Адрес: ${address}
Способ оплаты: ${paymentMethod}
Сумма заказа: ${totalPrice} руб.
Состав заказа: ${cartItems.map(item => `${item.name} - ${item.price} руб. x ${item.cartQuantity}`).join(', ')}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Failed to send email.', error);
      res.status(500).send('Order placed but failed to send email');
    } else {
      console.log('Email successfully sent!', info.response);
      res.status(200).send('Order placed and email sent successfully');
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});