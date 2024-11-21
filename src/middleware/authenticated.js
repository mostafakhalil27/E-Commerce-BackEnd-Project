import  jwt  from "jsonwebtoken";
import { Token } from "../../DB/models/token.model.js";
import { User } from "../../DB/models/user.model.js";

export const isAuthenticated= async(req, res, next)=>{

    //check token existence and type
    let { token } = req.headers;
    if(!token) 
    return next(new Error("You Should Send Token"));
  
    if(!token.startsWith(process.env.BARER_KEY)) 
    return next(new Error("Invalid Token"));

    //check payload
    token= token.split(process.env.BARER_KEY)[1];
    const payload= jwt.verify(token, process.env.TOKEN_KEY);
    if(!payload) {
      return next(new Error("Invalid Payload"))
    };

    //check token in DB
    const istoken= await Token.findOne({token, isValid:true});
    if(!istoken) {
      return next(new Error("Token Expired"))
    };

    //check user existence
    const user= await User.findOne({email: payload.email});
    if(!user) {
      return next(new Error("User Not Exist"))
    };

    
    req.user=user;
    return next();
};