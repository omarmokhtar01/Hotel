const express= require('express')

const {signUp,login}=require('../controller/authController')
const { signupValidation,loginValidation } = require('../utils/validator/authValidate')

const router = express.Router()
router.post('/signup',signupValidation,signUp)
router.post('/login',loginValidation,login)

module.exports=router