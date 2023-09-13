require("dotenv").config();
const express = require('express')
 cors = require('cors'),
 compression = require("compression"),
  xss = require("xss-clean"),
  toobusy = require("toobusy-js"),
  rateLimit = require("express-rate-limit"),
  helmet = require("helmet");
 morgan = require('morgan'),
 ApiError=require('./utils/apiError'),
 mountRoute = require("./routes"),
 dbConnect= require('./config/dbConnect');

 dbConnect()
const  app= express();

 



app.use(cors())
app.options('*',cors())

app.use(compression());

// app.use(express.urlencoded({extended:true,limit:"1kb"}))

// Middlewares
// Helmet helps you secure your Express apps by setting various HTTP headers. It's not a silver bullet, but it can help!
app.use(helmet());

if (process.env.NODE_ENV === "development") {
  app.use(morgan('dev'))
  console.log(`mode: ${process.env.NODE_ENV}`);
} else {
  console.log('Production mode');
}
app.use(express.json({limit:"20kb"}))

app.use(xss());

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 10, // Limit each IP to 10 requests per `window` (here, per 5 minutes)
  message:
    "Too many accounts created from this IP, please try again after an hour",
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Apply the rate limiting middleware to all requests
app.use("/api", limiter);


// middleware which blocks requests when we're too busy
app.use(function(req, res, next) {
  if (toobusy()) {
    res.send(503, "I'm busy right now, sorry.");
  } else {
    next();
  }
});

mountRoute(app);

app.all('*',(req,res,next)=>{
  next(new ApiError(400,`Cann't find this route ${req.originalUrl}`))
})
const { PORT } = process.env || 3000;

const server=app.listen(PORT,()=>{
    console.log(`server is lisiting port 3000`);
})

process.on('unhandledRejection',(err)=>{
  console.log(`unhandledRejection: ${err}`);
  console.log('Sutting down server...');
  server.close()
  process.exit(1)
})