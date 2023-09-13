var paypal = require('paypal-rest-sdk');

paypal.configure({
  mode: 'sandbox', // 'sandbox' for testing or 'live' for production
  client_id: process.env.PAYPAL_ID,
  client_secret: process.env.PAYPAL_SECRET
});

module.exports = paypal;
