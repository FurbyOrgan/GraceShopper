const nodeMailer = require('nodemailer');
const { isAdmin } = require('./loginStatus')


mailer = email => {
  const transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "paerproducts1234@gmail.com",
      pass: "michaelscott1234"
    }
  });

  const mailOptionsOrderCretated = {
    from: '"Paper" <paperproducts1234@gmail.com>',
    to: email,
    subject: "PAPER ORDER CONFIRMED",
    text:
      "Thank you for ordering paper products at Paper.com. Your order is being processed and we will let you know when your order has been shipped "
  };

  const mailOptionsOrderShipped = {
    from: '"Paper" <paperproducts1234@gmail.com>',
    to: email,
    subject: "YOUR PAPER PRODUCTS HAVE SHIPPED",
    text:
      "Your order has been shipped!!!"
  };

  const mailOptionsOrderDelivered = {
    from: '"Paper" <paperproducts1234@gmail.com>',
    to: email,
    subject: "YOUR PAPER PRODUCTS HAVE BEEN DELIVERED",
    text:
      "Your order has been delivered!!!"
  };

  transporter.sendMail(mailOptions, error => {
    if (error) {
      return console.error(error);
    }
    console.log("EMAIL HAS BEEN SENT");
  });
};


// mailer(req.user.email) in routes

module.exports = mailer;