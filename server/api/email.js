const nodeMailer = require('nodemailer');


  const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
      user: "randomobjects12345@gmail.com",
      pass: "fullstack"
    }
  });

  const mailOptionsOrderConfirmed = {
    from: '"Random Objects" <randomobjects12345@gmail.com>',
    to: 'email@example.com',
    subject: "RANDOM OBJECTS ORDER CONFIRMED",
    text:
      "Thank you for ordering random objects. Your order is being processed and we will let you know when your order has been shipped "
  };

  const mailOptionsOrderShipped = {
    from: '"Random Objects" <randomobjects12345@gmail.com>',
    to: 'email',
    subject: "YOUR RANDOM OBJECTS HAVE SHIPPED",
    text:
    "Your order has been shipped!!!"
  };
  
  const mailOptionsOrderDelivered = {
    from: '"Random Objects" <randomobjects12345@gmail.com>',
    to: 'email',
    subject: "YOUR RANDOM OBJECTS HAVE BEEN DELIVERED",
    text:
      "Your order has been delivered!!!"
  };
  



module.exports = { 
  transporter,
  mailOptionsOrderConfirmed,
  mailOptionsOrderShipped, 
  mailOptionsOrderDelivered
}
