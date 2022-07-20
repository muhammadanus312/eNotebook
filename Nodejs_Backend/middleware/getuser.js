const jwt=require('jsonwebtoken')

let JWT_SECRET='iamanas'

const getuser=(req,res,next)=>{
    // get userid from jwt token
    const token=req.header('authentication-token')
    if(!token){
        res.status(401).send({error:"please authenticate user using valid token"})
    }
    try {
        const data=jwt.verify(token,JWT_SECRET)
        req.user=data.user
        // console.log(data.user)

    } catch (error) {
        res.status(401).send({error:"please authenticate user using valid token"})
    }
    //next is function which run after getuser in authentication.js
    next()
}

module.exports=getuser