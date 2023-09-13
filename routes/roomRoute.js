const express = require('express')
const {createRoom,getAllRoom,getOneRoom}=require('../controller/roomController')
const { allowedTo, authProtect } = require('../controller/authController')

const router = express.Router()

router.post('/create-room',authProtect,allowedTo('admin'),createRoom)
router.get('/get-rooms',getAllRoom)
router.get('/get-oneroom/:id',getOneRoom)


module.exports=router