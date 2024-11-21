import joi from "joi";

// register
export const registerSchema= joi.object({
    userName: joi.string().required().min(3).max(20),
    email:joi.string().email().required(),
    password: joi.string().required(),
    confirmedPassword: joi.string().required().valid(joi.ref("password")),
    gender: joi.string().valid("male", "female"),
    phone: joi.string().pattern(/^01[0,1,2,5]{1}[0-9]{8}$/),
    role: joi.string().valid("admin","user")
}).required();

// activateAccount
export const activateAccountSchema= joi.object({
    activationCode: joi.string().required()
}).required();

//login
export const loginSchema= joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
}).required();

//forgetpasswordCode
export const forgetPassCodeSchema= joi.object({
    email: joi.string().email().required()
});

//reset password
export const resetPassSchema=joi.object({
    email: joi.string().required().email(),
    forgetCode: joi.string().required(),
    password: joi.string().required(),
    confirmedPassword: joi.string().required().valid(joi.ref("password"))
}).required();