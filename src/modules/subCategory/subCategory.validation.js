import joi from "joi";
import { isValidObjectId } from "../../middleware/validation.js";

export const createSubCategorySchema= joi.object({
    name: joi.string().required().min(5).max(20),
    categoryId: joi.string().custom(isValidObjectId).required(),
    brandId:joi.string().custom(isValidObjectId),
    image: joi.string()
}).required();

export const updateSubCategorySchema= joi.object({
    name: joi.string().required().min(5).max(20),
    subCategoryId: joi.string().custom(isValidObjectId),
    categoryId:joi.string().custom(isValidObjectId)
}).required();

export const deleteSubCategorySchema= joi.object({
    subCategoryId: joi.string().custom(isValidObjectId),
    categoryId:joi.string().custom(isValidObjectId)
}).required();

