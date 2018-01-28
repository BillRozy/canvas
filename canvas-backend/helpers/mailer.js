'use strict';
const nodemailer = require('nodemailer');

// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
const testTransporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: 'ak5mlseszqh7twij@ethereal.email',
    pass: 'CNCHsNSZfnzC3vmhVe',
  },
});

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 587,
  auth: {
    user: process.eventNames.SMTP_USER,
    pass: process.eventNames.SMTP_PASSWORD,
  },
});

// setup email data with unicode symbols
let mailOptions = {
  from: '"CANVAS 👻" <support@canvasrussia.com>', // sender address
  to: 'bar@example.com, baz@example.com', // list of receivers
  subject: 'Hello ✔', // Subject line
  text: 'Welcome On Board', // plain text body
  html: '<b>Welcome On Board!</b>', // html body
};

// testTransporter.sendMail(mailOptions, (error, info) => {
//   if (error) {
//     return console.log(error);
//   }
//   console.log('Message sent: %s', info.messageId);
//   // Preview only available when sending through an Ethereal account
//   console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

//   // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
//   // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
// });

const printUrl = (info) => {
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
};

module.exports = {
  testTransporter,
  transporter,
  printUrl,
};
