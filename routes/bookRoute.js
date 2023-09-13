const express = require('express')
const {createBooking,cancelBooking}=require('../controller/bookingController')
const {signUp,login,authProtect,changePassword,allowedTo}=require('../controller/authController')
const { createBookingValidation } = require('../utils/validator/bookingValidate')

const router = express.Router()

router.post('/create-booking',createBookingValidation,authProtect,allowedTo('user'),createBooking)
router.delete('/cancel-booking/:id',authProtect,allowedTo('user'),cancelBooking)

// router.get('/get-rooms',getAllRoom)
// router.get('/get-oneroom/:id',getOneRoom)


module.exports=router