const { check,body } = require('express-validator');
const validatorMiddleware = require("../../middleware/validateMiddeware")
const db = require('../../config/db')
exports.signupValidation = [
check('username')
.notEmpty()
.withMessage('Should Not Empty')
    .isString()
    .withMessage('Should be String')
    .isLength({ min: 3 , max: 32})
    .withMessage('Invalid Length username between 3 , 32 charactar'),
    // Check Email
    check('email')
    .notEmpty()
    .withMessage('Email Should Not Empty')
    .isEmail()
    .withMessage('Input should be Email')
    .custom(async(value) => {
        return db.query(`SELECT * FROM users WHERE email = '${value}'`).then((user) => {
        if (user[0].length > 0) {
            return Promise.reject("E-mail already in use");
        }
        })
    }),
        // Check Password
    check('password')
    .notEmpty()
    .withMessage('Password is Required')
    .isString()
    .isLength({min:6})
    .withMessage('Please enter a strong password with minimum 6 char')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-=_+{};':"|,.<>?]).*$/)
    .withMessage('Password must contain a combination of uppercase letters, lowercase letters, numbers, and symbols')
    ,validatorMiddleware
]



exports.loginValidation = [
    // Check Email
    check('email')
    .notEmpty()
    .withMessage('Email Should Not Empty')
    .isEmail()
    .withMessage('Input should be Email').custom(async(value)=>{
        const user= await db.query(`SELECT * FROM users WHERE email = '${value}'`)
        // to check if email is found
        if (user[0].length == 0) {
            console.log(user[0]);
            return Promise.reject(new Error("This email is not found, please sign up"));
        }
    }),
        // Check Password
    check('password')
    .notEmpty()
    .withMessage('Password is Required')
    .isString()
    .isLength({min:6})
    .withMessage('Please enter a strong password with minimum 6 char')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-=_+{};':"|,.<>?]).*$/)
    .withMessage('Password must contain a combination of uppercase letters, lowercase letters, numbers, and symbols')
    ,validatorMiddleware
]