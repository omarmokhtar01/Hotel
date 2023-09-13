var paypal = require('paypal-rest-sdk');

paypal.configure({
  mode: 'sandbox', // 'sandbox' for testing or 'live' for production
  client_id: 'AYTSv9hGa4qhs4OwTegUszQTpl8OdpCkKi8naBVUBVPD_qoicTWfDIzeVFt9Rp8TQlxYr1djAO30Ykzd',
  client_secret: 'EMptT8Eh0cx66Ol7BbMg2bOXJi1501vDzhee5Sh71w1ht_CLscq98oBd-8ks9CwIA1ZbKdWkwEDriu1a'
});

module.exports = paypal;