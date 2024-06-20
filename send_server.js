const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 3003;

app.use(bodyParser.json());
app.use(cors());

app.post('/home', (req, res) => {
  const { name, email, message } = req.body;
  console.log('Message sent:', { name, email, message });

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // Gmail SMTP server
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'isip_e.o.murlaeva@mpt.ru@mpt.ru', // your email
      pass: 'weeweeblin', // your password
    },
  });

  const mailOptions = {
    from: 'isip_e.o.murlaeva@mpt.ru', // your email
    to: 'isip_e.o.murlaeva@mpt.ru', // recipient's email
    subject: 'Новое сообщение от пользователя',
    text: `Новое сообщение от пользователя:
ФИО: ${name}
Cообщение: ${message}`
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error('Failed to send email.', err);
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
