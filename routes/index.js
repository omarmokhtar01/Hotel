const routeAuth= require('../routes/authRoute')
const routeHotel = require('../routes/hotelRoute')
const routeRoom = require('../routes/roomRoute')

const routeBooking = require('../routes/bookRoute')
const routePayment = require('../routes/paymentRoute')


const mountRoute = (app)=>{
app.use("/api/v1/auth",routeAuth)
app.use("/api/v1/hotel",routeHotel)
app.use("/api/v1/room",routeRoom)
app.use("/api/v1/book",routeBooking)
app.use("/api/v1/payment",routePayment)


}

module.exports = mountRoute;