const { check, body } = require("express-validator");
const validatorMiddleware = require("../../middleware/validateMiddeware");
const db = require("../../config/db");
//     "name":"hAilsaddtodsnds", "description":"dasfsdfsdf", "location":"giza", "amenities":"sa"

exports.createHotelValidation = [
  check("name")
    .notEmpty()
    .withMessage("name Should Not Empty")
    .isString()
    .withMessage("name Should be String")
    .isLength({ min: 3, max: 32 })
    .withMessage("Invalid Length name between 3 , 32 charactar")
    .custom(async (value) => {
      const checkHotel = await db.query(
        `SELECT * FROM hotels WHERE name = '${value}'`
      );

      if (checkHotel[0].length > 0) {
        return Promise.reject(new ApiError(404, "hotel already exists"));
      }
    }),
  check("description")
    .notEmpty()
    .withMessage("description Should Not Empty")
    .isString()
    .withMessage("description Should be String")
    .isLength({ min: 3, max: 300 })
    .withMessage("Invalid Length description between 3 , 300 charactar"),

  check("location")
    .notEmpty()
    .withMessage("location Should Not Empty")
    .isString()
    .withMessage("location Should be String")
    .isLength({ min: 3, max: 32 })
    .withMessage("Invalid Length location between 3 , 32 charactar"),

  check("amenities")
    .notEmpty()
    .withMessage("amenities Should Not Empty")
    .isString()
    .withMessage("amenities Should be String")
    .isLength({ min: 3, max: 50 })
    .withMessage("Invalid Length amenities between 3 , 50 charactar"),
  check("isPaid").default(Boolean(false)),
  validatorMiddleware,
];
