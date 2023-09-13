// @desc this class can make reuse any where about operation errors (that can i predict)
class ApiError extends Error{
    constructor(statusCode,message){
        super(message)
        this.statusCode=statusCode;
        this.status= `${statusCode}`.startsWith(4||5) ? 'fail':'error';
        this.isOperational= true
    }
}
module.exports = ApiError