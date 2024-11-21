import mongoose, { Schema ,Types,model } from "mongoose";
const cartsSchema= new Schema({
    userId:{
        type:Types.ObjectId,
        required:true, 
        unique:true, 
        ref:"User"
    },
    products:[{
        _id:false,
        productId:{
          type:Types.ObjectId,
          ref:"Product"
        },
        quantity:{
          type: Number, 
          default: 1
        }
    }]
},
{timestamps: true});

export const Carts = mongoose.model.Carts || model("Carts", cartsSchema);