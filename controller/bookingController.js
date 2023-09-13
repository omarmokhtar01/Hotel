const ayncHandler = require("express-async-handler");
const db = require("../config/db");
const ApiError = require("../utils/apiError");

// @desc for booking room in hotel
// @route (Post) /api/v1/book/create-booking
// @acess (user)
exports.createBooking = ayncHandler(async (req, res, next) => {
  // ispayed defult false
  const {  room_id , check_in ,check_out ,num_of_guest } = req.body;
let user_id = req.user.id
  const bookData = { user_id , room_id , check_in ,check_out ,num_of_guest}
  //  to create new room
  try {
    const booking=await  db.query("INSERT INTO bookings SET ? ", bookData)
  
    // to send new room data to response
 const room= await db.query(
      `SELECT * FROM bookings WHERE id = ${booking[0].insertId}`,
    );
    res.status(201).json({ data: room[0][0] });
  } catch (error) {
    res.status(404).json(error)
  }
  });

// @desc for cancel booking
// @route (Post) /api/v1/cancel-booking/:id
// @acess (user)
exports.cancelBooking = ayncHandler(async (req, res, next) => {
const {id}=req.params
    const booking = await db.query(`DELETE FROM bookings WHERE id = ${id} AND user_id = ${req.user.id}`)
    if(booking[0].affectedRows != 1){
      return   res.status(404).json(`no booking by this id ${id}`)
      };
    res.status(200).json("booking is canceled")
  });