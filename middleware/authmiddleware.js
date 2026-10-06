const jwt=require("jsonwebtoken")
const authMiddleware=(req,res,next)=>{
    try{
    const {token}=req.cookie
    if(!token){
        return req.status(400).json({
            message:"token not found"
        })
    }
    const decode=jwt.verify(token.process.env.SECRET_KEY)
    req.user=decode
    next()
}catch{
    console.log(error)
    req.status(403).status({
        message:"token found"
    })
}
}