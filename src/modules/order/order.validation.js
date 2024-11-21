import joi from "joi";
import { isValidObjectId } from "../../middleware/validation.js";

//create
export const createOrderSchema= joi.object({
    address:joi.string().required().min(10),
    coupon:joi.string().length(5),
    phone: joi.string().pattern(/^01[0,1,2,5]{1}[0-9]{8}$/).required(),
    payment: joi.string().required().valid("cach", "visa")
}).required();

//cancelOrderSchema
export const cancelOrderSchema= joi.object({
    orderId:joi.string().custom(isValidObjectId).required()
}).required();