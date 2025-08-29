import jwt from "jsonwebtoken"
const isAuth = async (req,res,next)=>{
  try {
    const token = req.cookies.token
    // console.log(token)
    if(!token){
        return res.status(400).json({message:"token is not found"})
    }

    const varifyToken = await jwt.verify(token,process.env.JWT_SECERET)
    // console.log(varifyToken);

    req.userId = varifyToken.userId;
    next();
  } catch (error) {
     return res.status(500).json({message:`isAuth error ${error}`})
  }
}

export default isAuth