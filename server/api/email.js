const nodeMailer = require('nodemailer');
const { isAdmin } = require('./loginStatus')


confirmationMailer = email => {
  const transporter = nodeMailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "randomobjects12345@gmail.com",
      pass: "fullstack"
    }
  });

  const mailOptionsOrderConfirmed = {
    from: '"Paper" <randomobjects12345@gmail.com>',
    to: email,
    subject: "PAPER ORDER CONFIRMED",
    text:
      "Thank you for ordering paper products at Paper.com. Your order is being processed and we will let you know when your order has been shipped "
  };

  transporter.sendMail(mailOptionsOrderConfirmed, error => {
    if (error) {
      return console.error(error);
    }
    console.log("EMAIL HAS BEEN SENT");
  });
};

shippedMailer = email => {
  const transporter = nodeMailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "randomobjects12345@gmail.com",
      pass: "fullstack"
    }
  });

  const mailOptionsOrderShipped = {
    from: '"Paper" <randomobjects12345@gmail.com>',
    to: email,
    subject: "YOUR PAPER PRODUCTS HAVE SHIPPED",
    text:
      "Your order has been shipped!!!"
  };

  transporter.sendMail(mailOptionsOrderShipped, error => {
    if (error) {
      return console.error(error);
    }
    console.log("EMAIL HAS BEEN SENT");
  });
};

deliveredMailer = email => {
  const transporter = nodeMailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "randomobjects12345@gmail.com",
      pass: "fullstack"
    }
  });

  const mailOptionsOrderDelivered = {
    from: '"Paper" <randomobjects12345@gmail.com>',
    to: email,
    subject: "YOUR PAPER PRODUCTS HAVE BEEN DELIVERED",
    text:
      "Your order has been delivered!!!"
  };

  transporter.sendMail(mailOptionsOrderDelivered, error => {
    if (error) {
      return console.error(error);
    }
    console.log("EMAIL HAS BEEN SENT");
  });
};
// confirmationMailer(req.user.email) in users post route after order has been submitted

module.exports = { 
  confirmationMailer,
  shippedMailer,
  deliveredMailer
}


