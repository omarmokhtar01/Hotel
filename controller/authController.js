const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const db = require("../config/db");
const ApiError = require("../utils/apiError");
const generateToken = require("../utils/createToken");
const jwt =require('jsonwebtoken')

// @desc for register new user
// @route (Post) /api/v1/auth/signup
// @acess (user)
exports.signUp = asyncHandler(async (req, res, next) => {
  let { username, email, password } = req.body;
  password = await bcrypt.hash(password, 8);
  const userData = { username, email, password,role: "user"};
  try {
      //  to create new user
const createUser= await db.query("INSERT INTO users SET ? ", userData)
// to send new user data and token to response
const showUserData= await db.query(
  `SELECT * FROM users WHERE id = ${createUser[0].insertId}`)
  const user = showUserData[0][0];
  const token = generateToken(user.email);
  res.status(201).json({ data: user, token: token });
  } catch (error) {
    res.status(400).json(error)
  }
  });


// @desc to login user
// @route (Post) /api/v1/auth/login
// @acess (user)
exports.login = asyncHandler(async (req, res, next) => {
  let { email, password } = req.body;
  // to check if email user exists
  const user = await db.query(`SELECT * FROM users WHERE email = '${email}'`);

  // check if user exists
    // to compare password in body and database
    bcrypt.compare(password, user[0][0].password, (err, isMatch) => {
      if (isMatch) {
        const token = generateToken(user[0][0].email);
        res.json({ data: user[0][0], token });
      } else {
        return next(new ApiError(400, "This email or password is incorrect"));
      }
    });

});





exports.authProtect=(asyncHandler(async(req,res,next)=>{
let token;
// 1) check if token exist
if (req.headers.authorization&& req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(' ')[1]
}
if (!token) {
    new ApiError(401, "Please Login first to access this route");
}

// 2) check if token (no changes or expire)
const decode=jwt.verify(token,'secrettoken')

// 3) check if user exist
const currentUser=await db.query(`SELECT * FROM users WHERE email = '${decode.email}'`)
if (!currentUser) {
    return new ApiError(400,'token for this user is not exist')
}
req.user = currentUser[0][0];

next()
}))


// @desc to check how can access to specific routes
// @desc    Authorization (User Permissions)
// ["admin", "manager"]
// reset parameter [array]
exports.allowedTo = (...role) =>
  async (req, res, next) => {
    // 1) access roles
    // 2) access registered user (req.user.role)
    if (!role.includes(req.user.role)) {
      return next(
        new ApiError(403, "You are not allowed to access this route")
      );
    }
    next();
  };