const express = require('express')
const {postPayment,getPayment}=require('../controller/paymentController')
const { authProtect,allowedTo } = require('../controller/authController')

const router = express.Router()

router.post('/pay',authProtect,allowedTo("user"),postPayment)

router.get('/execute/:paymentId/:payerId',authProtect,allowedTo("user"),getPayment)

module.exports=router