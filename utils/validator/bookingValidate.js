const { check, body } = require("express-validator");
const validatorMiddleware = require("../../middleware/validateMiddeware");
const db = require("../../config/db");

exports.createBookingValidation = [
  check("room_id")
    .notEmpty()
    .withMessage("room_id required")
    .custom(async (value, { req }) => {
      const room = await db.query(`
            SELECT *
            FROM bookings
            WHERE room_id = ${value}
            AND (
              (check_in >= '${req.body.check_in}' AND check_in <= '${req.body.check_out}')
              OR (check_out >= '${req.body.check_in}' AND check_out <= '${req.body.check_out}')
            )
        `);

      if (room[0].length != 0) {
        return Promise.reject(new Error("this room is booking"));
      }
    }),
  check("check_in").notEmpty().isDate().withMessage("check_in Should be Date YY-MM-DD"),
  check("check_out").notEmpty().isDate().withMessage("check_out Should be Date YY-MM-DD"),
  check("num_of_guest").notEmpty().isInt().withMessage("Should Integer Number")
  .custom(async(value,{req})=>{


    const room = await db.query(`
    SELECT *
    FROM rooms
    WHERE id = ${req.body.room_id}
`);

    if (value > room[0][0].MaxNumPerson ) {
        return Promise.reject(new Error("Number of Guests is bigger than room is avaliable"))
    }
  }),
  check("isPaid").default(Boolean(false)),
  validatorMiddleware,
];
