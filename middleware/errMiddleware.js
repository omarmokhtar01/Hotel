const globalError=(err,req,res,next)=>{
err.statusCode=err.statusCode||500;
err.status =err.status||'error';

if (process.env.NODE_ENV ==="development") {
    sendErrDevelopment(err,res)
} else {
    sendErrProduction(err,res)
}
}

const sendErrProduction=(err,res)=>{
    return res.status(err.status).json({
        status:err.status,
        message:err.message,
    })
}

const sendErrDevelopment=(err,res)=>{
    return res.status(err.status).json({
        status:err.status,
        err:err,
        message:err.message,
        stack:err.stack
    })
}


module.exports = globalError;