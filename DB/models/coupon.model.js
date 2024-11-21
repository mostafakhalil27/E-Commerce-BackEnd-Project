import mongoose, { Schema, Types, model } from "mongoose" ;

const couponSchema= new Schema({
    name:{
      type: String,
      required: true
    },
    discount: {
      type :Number, 
      required: true,
      min:1,
      max: 100
    },
    expiredAt: {
      type: Date, 
      required: true
    },
    createdBy: {
      type: Types.ObjectId, 
      required: true,
      ref: "User"
    }
},
{timestamps: true});

export const Coupon= mongoose.model.Coupon || model("Coupon", couponSchema); 

