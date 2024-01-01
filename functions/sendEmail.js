const nodemailer = require('nodemailer');
const { htmlToSend } = require('../helpers/htmlToSend');

module.exports.handler = async (event) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: '465',
    secure: true,
    auth: {
      user: process.env.EMAIL_CONTACT, 
      pass: process.env.EMAIL_ORIGIN_PASSWORD
    }
  });
  const {name, email, description} = JSON.parse(event.body)
  console.log(name, email, description)
  const mailOptions = {
    from: `${name} <${process.env.EMAIL_CONTACT}>`,
    to: process.env.EMAIL_TO_SEND,
    subject: 'Correo de ' + name,
    html: htmlToSend(name, email, description)
  };
  const info = await transporter.sendMail(mailOptions)
  console.log(info)

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "email sent!",
        input: event,
        info: info
      },
      null,
      2
    ),
  };
};