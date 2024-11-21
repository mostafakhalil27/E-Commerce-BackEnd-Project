import { User } from "../../../DB/models/user.model.js";
import { Token } from "../../../DB/models/token.model.js";
import bcryptjs from "bcryptjs";
import crypto from "crypto";
import {sendEmail} from "./../../utils/sendMailer.js";
import {signUpTemp} from "./../../utils/generateHTML.js";
import jwt from "jsonwebtoken";
import Randomstring from "randomstring";
import { Carts } from "../../../DB/models/carts.model.js";

// Register
export const register= async (req, res, next)=>{
    const {userName, email, password,gender, phone, role}= req.body;
    const isUser= await User.findOne({email});
    if(isUser) {
      return (next(new Error("Email is already exist", {cause:409})))};
    const hashedPassword= bcryptjs.hashSync(password, Number(process.env.SALT_ROUND));
    const activationCode= crypto.randomBytes(64).toString("hex");
    const user= await User.create({gender, phone, role,userName, email, password: hashedPassword,  activationCode}); //profileImage: {id: public_id, url: secure_url},
    const link= `http://localhost:3000/auth/confirmEmail/${activationCode}`;
    const isSent= await sendEmail({to:email, subject: "Activate Account", html: signUpTemp(link)});
    return isSent ? res.json({success: true, message: "Please review your email!"}): next(new Error("something went wrong"));
};

//Activate Acc
export const activateAccount= async(req, res, next)=>{
    const user= await User.findOneAndUpdate({activationCode: req.params.activationCode},{isConfirmed: true, $unset:{activationCode:1}});
    if(!user) 
    next(new Error("Something went wrong"));
    await Carts.create({userId:user._id})
    return res.send("Account has activated");
};

//logIn
export const logIn= async(req, res, next)=>{
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(!user) {
    return next(new Error("User not found or maybe user is incorrect!"))};
    const matches = bcryptjs.compareSync(password, user.password);
    if(!matches) {
      next(new Error("Incorrect passord!"))
    };
    if(!user.isConfirmed) {
      return next(new Error("you must confirm your email.. pelese check your inbox"))
    };
    const token= jwt.sign({id: user._id, email: user.email},process.env.TOKEN_KEY, {expiresIn: "1d"});
    await Token.create({token, user: user._id, agent:req.headers["user-agent"]});
    user.status="online";
    await user.save();
    return res.json({success: true, message: "logedin", token});
};

//forget password
export const sendForgetPassCode= async(req, res, next)=>{
    const user= await User.findOne({email:req.body.email});
    if (!user) {
    return next(new Error("User not found", {cause:404}))}
    const code = Randomstring.generate({
        length:5,
        charset: "numeric"
    });
    user.forgetCode= code;
    await user.save();
    const isSent= await sendEmail({to:user.email, subject:"Reset password", html: `<p>${code}</p>`});
    return isSent? res.json({success: true, message: "Please review your email!"}): 
    next(new Error("something went wrong"));
};

//reset passord
export const resetPassword= async (req, res, next)=>{
    let user= await User.findOneAndUpdate({forgetCode:req.body.forgetCode},{$unset:{forgetCode:1}});
    if(!user) {
    return next(new Error("user is not found or invalid code"))};
    user.password= bcryptjs.hashSync(req.body.password, Number(process.env.SALT_ROUND));
    await user.save();
    const tokens= await Token.find({user:user._id});
    tokens.forEach(async(token)=>{
        token.isValid=false;
        await token.save();
    })
    return res.json({success: true, message:"password has changed successfully"})
};