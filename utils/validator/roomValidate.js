const { check, body } = require("express-validator");
const validatorMiddleware = require("../../middleware/validateMiddeware");
const db = require("../../config/db");

//  hotelId 

exports.createHotelValidation = [
  check("round")
    .notEmpty()
    .withMessage("round Should Not Empty")
    .isInt()
    .withMessage("round Should be Integer"),

    check("availability")
    .default(Boolean(true))
    ,
    check("MaxNumPerson")
    .notEmpty()
    .withMessage("MaxNumPerson Should Not Empty")
    .isInt()
    .withMessage("MaxNumPerson Should be Integer"),

    check("numRoom")
    .notEmpty()
    .withMessage("numRoom Should Not Empty")
    .isInt()
    .withMessage("numRoom Should be Integer"),

    check("amenities")
    .notEmpty()
    .withMessage("amenities Should Not Empty")
    .isString()
    .withMessage("amenities Should be String")
    .isLength({ min: 3, max: 300 })
    .withMessage("Invalid Length amenities between 3 , 300 charactar"),

  check("pricing")
    .notEmpty()
    .withMessage("pricing Should Not Empty")
    .isFloat()
    .withMessage("pricing Should be Float"),

check("hotelId").notEmpty().withMessage("hotelId should not empty")
.custom(async(value,{req})=>{
  const checkRoom = await db.query(`SELECT * FROM rooms WHERE round = '${req.body.name}' AND hotelId = '${value} AND numRoom = '${req.body.numRoom}`)
    
      if (checkRoom[0].length > 0) {
        return Promise.reject(new Error('room already exists'));
      }
})
,
  validatorMiddleware,
];
