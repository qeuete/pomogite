require('dotenv').config()
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
})

const mailOptions = {
    from: 'isip_e.o.murlaeva@mpt.ru',
    to: 'isip_e.o.murlaeva@mpt.ru',
    subject: 'аллалала',
    text: 'Текст письма'
}

transporter.sendMail(mailOptions, err = new Error(message))