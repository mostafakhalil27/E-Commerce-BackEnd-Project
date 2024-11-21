import joi from "joi";
import { isValidObjectId } from "../../middleware/validation.js";

//add to cart
export const addToCartSchema= joi.object({
    productId: joi.custom(isValidObjectId).required(),
    quantity: joi.number().integer().required().min(1)
}).required();

//updateCart
export const updateCartSchema= joi.object({
    productId: joi.custom(isValidObjectId),
    quantity: joi.number().integer().min(1)
}).required();

//removeProductFromCard
export const removeProductFromCartSchema= joi.object({
    productId: joi.custom(isValidObjectId)
}).required();

