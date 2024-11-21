import joi from "joi";
import { isValidObjectId } from "../../middleware/validation.js";

//createSchema
export const createBrandSchema =joi.object({
    name: joi.string().required(),
    // subCategoryId: joi.string().custom(isValidObjectId).required(),
    image: joi.string()
}).required();

//updateSchema
export const updateBrandSchema =joi.object({
    name: joi.string().required(),
    brandId: joi.string().custom(isValidObjectId).required()
}).required();

//delete schema
export const deleteBrandSchema =joi.object({
    brandId: joi.string().custom(isValidObjectId).required()
}).required();