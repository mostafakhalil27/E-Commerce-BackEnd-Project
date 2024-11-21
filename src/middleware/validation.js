import { Types } from "mongoose";

export const isValidObjectId= (value, helper)=>{
    return Types.ObjectId.isValid(value)
    ? true
    : helper.message("Invalid ObjectId")
}; 

export const isValid= (schema)=>{
    return (req, res, next)=>{
        const Req= {...req.body, ...req.params, ...req.query};
        const validationResults= schema.validate(Req, {abortEarly: false});
        if(validationResults.error){
            const message= validationResults.error.details.map((error)=>error.message);
            return next(new Error(message), {cause: 400});
        }  
        return next();
    };
};