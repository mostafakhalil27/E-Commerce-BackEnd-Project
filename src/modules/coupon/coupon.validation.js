import joi from "joi";

//creation
export const createCouponSchema= joi.object({
    discount: joi.number().required().min(1).max(100),
    expiredAt: joi.date().greater(Date.now()).required()
}).required();

//update
export const updateCouponScrma= joi.object({
    discount: joi.number().min(1).max(100),
    expiredAt: joi.date().greater(Date.now()),
    code: joi.string().length(5).required()
}).required();

//delete
export const deleteCouponSchema= joi.object({
    code: joi.string().length(5).required()
}).required();
