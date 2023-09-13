const db = require('../config/db');
const ApiError = require('../utils/apiError');
var paypal = require('../utils/paypal');



exports.postPayment =async (req, res,next) => {
const booking =await db.query(`SELECT * FROM bookings WHERE user_id = ${req.user.id}`)
if (booking[0].length > 0) {
  return next(new ApiError(404,"this user is not booking this id"))
}
let check_in=Number(booking[0][0].check_in)
let check_out=Number(booking[0][0].check_out)
let numberOfDays = (check_out-check_in)/86400000

const room =await db.query(`SELECT * FROM rooms WHERE id = ${booking[0][0].room_id}`)

const hotel =await db.query(`SELECT * FROM hotels WHERE id = ${room[0][0].hotelId}`)


let totalPrice=numberOfDays *room[0][0].pricing;

const paymentObj = {
    "intent": "sale",
    "payer": {
        "payment_method": "paypal"
    },
    "redirect_urls": {
        "return_url": "http://return.url",
        "cancel_url": "http://cancel.url"
    },
    "transactions": [{
        "item_list": {
            "items": [{
                "name": `Room `,
                "sku": "item",
                "price": `${room[0][0].pricing}`,
                "currency": "USD",
                "quantity": numberOfDays
            }]
        },
        "amount": {
            "currency": "USD",
            "total": `${totalPrice}`
        },
        "description": `This is the payment for room number ${room[0][0].numRoom} in hotel ${hotel[0][0].name}  
        from ${numberOfDays} days`
    }]
};

  paypal.payment.create(paymentObj, (error, payment) => {
    if (error) {
      console.log(error);
      res.status(500).json("Payment creation failed.");
    } else {
      console.log(payment)
    
      res.status(201).json("Payment creation sucsessful.");
    }
  });
}


exports.getPayment = (req, res) => {
  const { paymentId, payerId } = req.params;

  const executeObj = {
    payer_id: payerId,
  };

  paypal.payment.execute(paymentId, executeObj, (error, payment) => {
    if (error) {
      console.log(error);
      res.status(500).json("Payment execution failed.");
    } else {
      // Payment executed successfully
      res.status(200).json("Payment executed successfully.");
    }
  });
}