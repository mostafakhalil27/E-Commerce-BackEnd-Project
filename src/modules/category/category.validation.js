import joi from "joi";
import { isValidObjectId } from "../../middleware/validation.js";

//createSchema
export const createCategorySchema =joi.object({
    name: joi.string().required().min(4).max(20),
    categoryId: joi.string().custom(isValidObjectId),
    brandId: joi.string().custom(isValidObjectId),
    image: joi.string()
}).required();

//updateSchema
export const updateCategorySchema =joi.object({
    name: joi.string().required(),
    categoryId: joi.string().custom(isValidObjectId).required()
}).required();
//delete schema
export const deleteCategorySchema =joi.object({
    categoryId: joi.string().custom(isValidObjectId).required()
}).required();