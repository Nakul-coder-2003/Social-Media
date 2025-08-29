import jwt from "jsonwebtoken"
const generateToken = async(userId)=>{
   try {
    const token = await jwt.sign({userId},process.env.JWT_SECERET,{expiresIn : "7d"})
    return token
   } catch (error) {
     return res.status(500).json({message:`gen token error ${error}`})
   }
}

export default generateToken