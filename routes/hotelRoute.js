const express = require('express')
const {createHotel,getAllHotel,getOneHotel}=require('../controller/hotelController')
const { authProtect, allowedTo } = require('../controller/authController')
const { createHotelValidation } = require('../utils/validator/hotelValidate')

const router = express.Router()

router.post('/create-hotel',createHotelValidation,authProtect,allowedTo('admin'),createHotel)
router.get('/get-hotels',getAllHotel)
router.get('/get-oneHotel/:id',getOneHotel)


module.exports=router