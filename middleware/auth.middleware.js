import jwt from "jsonwebtoken"
const auth=(req,res,next)=>{
    const authHeader=req.header("Authorization")
    if(!authHeader){
        return res.status(401).json({message:"Access denied no token provided"})
    }
    try{
        const token=authHeader.split(' ')[1]
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        req.user=decoded.user
        next();
    }catch(error){
        res.status(401).json({message:"Invalid token"})
    }
}
export default auth