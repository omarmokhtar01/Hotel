const anyncHandler = require("express-async-handler");
const db = require("../config/db");
const ApiError = require("../utils/apiError");

// @desc for create new room in spicific hotel
// @route (Post) /api/v1/room/create-room
// @acess (admin)
exports.createRoom = anyncHandler(async (req, res, next) => {
  const { round, hotelId, amenities, pricing, availability, MaxNumPerson,numRoom } = req.body;

  const roomData = { round, hotelId, amenities, pricing, availability ,MaxNumPerson,numRoom}

  //  to create new room
 const room=await db.query("INSERT INTO rooms SET ? ", roomData, )    

    // to send new room data to response
   const showRoomData=await db.query(
      `SELECT * FROM rooms WHERE id = ${room[0].insertId}`)
    res.status(201).json({ data: showRoomData [0][0]});

  });



// @desc for get all rooms and search
// @route (Post) /api/v1/room/get-rooms
// @acess all
exports.getAllRoom = async (req, res, next) => {
    // For pagination
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const offset = (page - 1) * limit;
  
    // For searching
    const searchTerm = req.query.searchTerm;
  
    // Get the total count of rooms
  const room=await  db.query("SELECT COUNT(*) as totalCount FROM rooms")
  
      const totalCount = room[0][0].totalCount;
      const totalPages = Math.ceil(totalCount / limit);
  
      // Execute the search query
  
      if (req.query.searchTerm) {
      const roomSearch=await  db.query(
          `SELECT * FROM rooms WHERE pricing LIKE '%${searchTerm}%' OR MaxNumPerson LIKE '%${searchTerm}%' OR amenities LIKE '%${searchTerm}%' LIMIT ${limit} OFFSET ${offset}`)
  
            res.status(200).json({
              paginateResult: {
                limit: limit,
                currentPage: page,
                totalPages: totalPages, // Add totalPages to the response
              },
              result: roomSearch[0].length,
              data: roomSearch[0],
            });
          }
        
       else {
      const allRoom=await  db.query(`SELECT * FROM rooms LIMIT ${limit} OFFSET ${offset}`)
  
          res.status(200).json({
            paginateResult: {
              limit: limit,
              currentPage: page,
              totalPages: totalPages, // Add totalPages to the response
            },
            result: allRoom[0].length,
            data: allRoom[0],
          });
        
      }
    
    }

// @desc for get information on room
// @route (Post) /api/v1/room/get-oneroom/:id
// @acess (user)
exports.getOneRoom = anyncHandler(async (req, res, next) => {
  const { id } = req.params;
 const room=await db.query(`SELECT * FROM rooms WHERE id = ${id}`)
 if (room[0].length ===0) {
  res.status(404).json({message:'No room found'})
}
    
    res.status(200).json(room[0][0]);
  });