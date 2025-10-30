// utils/mailer.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail', // o tu proveedor SMTP
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

exports.enviarCorreo = (destinatario, asunto, mensaje) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: destinatario,
    subject: asunto,
    html: mensaje
  };

  return transporter.sendMail(mailOptions);
};