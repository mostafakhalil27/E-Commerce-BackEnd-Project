import joi from "joi";
import { isValidObjectId } from "./../../middleware/validation.js";

//for ceation
export const createProductShcema= joi.object({
    name: joi.string().required().min(2).max(20),
    desciption: joi.string(),
    availableItems: joi.number().min(1).required(),
    price: joi.number().min(1).required(),
    discount: joi.number().min(1).max(100),
    categoryId: joi.string().custom(isValidObjectId),
    subCategoryId: joi.string().custom(isValidObjectId),
    brandId: joi.string().custom(isValidObjectId),
}).required();

//get all
export const allProductSchema=joi.object({
    categoryId: joi.string().custom(isValidObjectId),
    page:joi.number()
});

//for delete + get single product
export const productIdSchema= joi.object({
    productId: joi.string().custom(isValidObjectId)
});