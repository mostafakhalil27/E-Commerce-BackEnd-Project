import voucher_codes from "voucher-code-generator";
import { Coupon } from "../../../DB/models/coupon.model.js";

//create
export const createCoupon= async(req, res, next)=>{
    //generate code
    const code= voucher_codes.generate({length: 5}); // retun Arr
    //create
    const coupon= await Coupon.create({
        name: code[0],
        discount: req.body.discount,
        expiredAt: new Date(req.body.expiredAt).getTime(), //mm/dd/yy
        createdBy: req.user._id
    })
    //response
    return res.status(201).json({success: true, results: coupon});
};

//update
export const updateCoupon= async(req, res, next)=>{
    //check coupon
    if(!req.params.code) 
    return next(new Error("Code is required"));
    const coupon= await Coupon.findOne({name:req.params.code, expiredAt:{$gt:Date.now()}});
    if(!coupon) 
    return next(new Error("Coupon is not found", {cause: 404}));
    //check owner
    if(req.user._id != coupon.createdBy.toString()) 
    return next(new Error("you are not owner")); 
    //create
        coupon.discount = req.body.discount? req.body.discount : coupon.discount;
        coupon.expiredAt= req.body.expiredAt? new Date(req.body.expiredAt).getTime(): coupon.expiredAt;
    await coupon.save();
    //response
    return res.status(201).json({success: true, results: coupon, message: "Updated successfully"});
};

//delete
export const deleteCoupon= async(req, res, next)=>{
    //check coupon
    if(!req.params.code) 
    return next(new Error("Code is required"));
    const coupon= await Coupon.findOne({name:req.params.code});
    if(!coupon) 
    return next(new Error("Coupon is not found", {cause: 404}));
    //check owner
    if(req.user._id != coupon.createdBy.toString()) 
    return next(new Error("you are not owner"));
    //delete
    await Coupon.findOneAndDelete({name:req.params.code});
    //response
    return res.json({success: true, message: "Deleted successfully"});
};

//getAll
export const getAll= async(req, res, next)=>{
    return res.json({results: await Coupon.find()});
};