const jwt =require('jsonwebtoken')

const generateToken =(payload)=>{
  return jwt.sign({email:payload},process.env.SECRET_TOKEN,{expiresIn:'30 days'})
}

module.exports=generateToken