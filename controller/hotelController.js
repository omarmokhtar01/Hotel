const anyncHandler = require("express-async-handler");
const db = require("../config/db");
const ApiError = require("../utils/apiError");

// @desc for create new hotel
// @route (Post) /api/v1/hotel/create-hotel
// @acess (admin)
exports.createHotel = anyncHandler(async (req, res, next) => {
  const { name, description,location, amenities, 
} = req.body;

  const hotelData = { name, description,location, amenities, 
};
  //  to create new hotel
const hotel= await db.query("INSERT INTO hotels SET ? ", hotelData)

    
    // to send new hotel data to response
    const SohwHotelData= await  db.query(
      `SELECT * FROM hotels WHERE id = ${hotel[0].insertId}`)
      res.status(201).json({ data: SohwHotelData[0][0] });
    })
      // 





// @desc for get all hotels and search
// @route (Post) /api/v1/hotel/get-hotels
// @acess all
exports.getAllHotel = async (req, res, next) => {
  // For pagination
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const offset = (page - 1) * limit;

  // For searching
  const searchTerm = req.query.searchTerm;

  // Get the total count of hotels
const hotels=await  db.query("SELECT COUNT(*) as totalCount FROM hotels")

    const totalCount = hotels[0][0].totalCount;
    const totalPages = Math.ceil(totalCount / limit);

    // Execute the search query

    if (req.query.searchTerm) {
    const hotelSearch=await  db.query(
        `SELECT * FROM hotels WHERE name LIKE '%${searchTerm}%' OR location LIKE '%${searchTerm}%' LIMIT ${limit} OFFSET ${offset}`,)
          res.status(200).json({
            paginateResult: {
              limit: limit,
              currentPage: page,
              totalPages: totalPages, // Add totalPages to the response
            },
            result: hotelSearch[0].length,
            data: hotelSearch[0],
          });

    } else {
   const allHotels=await   db.query(`SELECT * FROM hotels LIMIT ${limit} OFFSET ${offset}`,) 
        res.status(200).json({
          paginateResult: {
            limit: limit,
            currentPage: page,
            totalPages: totalPages, // Add totalPages to the response
          },
          result: allHotels[0].length,
          data: allHotels[0],
        });
      }
    }
  


// @desc for get information one hotel
// @route (Post) /api/v1/hotel/get-oneHotel/:id
// @acess (user)
exports.getOneHotel = anyncHandler(async (req, res, next) => {
  const { id } = req.params;
 const hotel=await db.query(`SELECT * FROM hotels WHERE id = ${id}`)
    // to check if hotel exist
    if (hotel[0].length ===0) {
      res.status(404).json({message:'No Hotel found'})
    }

    res.status(200).json({'data':hotel[0][0]});
  });

