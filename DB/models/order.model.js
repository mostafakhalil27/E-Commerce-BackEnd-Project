import mongoose ,{ Schema, model, Types } from "mongoose";

const orderSchema= new Schema({
    userId: {
      type: Types.ObjectId, 
      required: true,
      ref:"User"
    },
    products:[
        {
            _id: false,
            productId:{
              type:Types.ObjectId,
              ref:"Product"
            },
            quantity:{
              type: Number, 
              min:1
            },
            name:String,
            itemPrice:Number,
            totalPrice:Number
        }
    ],

    // invoise:{id:String, url: String},
    address:{
      type:String,
      required: true
    },
    phone:{
      type:String,
      required:true
    },
    price:{type:Number},
    couponId:{
        id:{
          type:Types.ObjectId, 
          ref: "Coupon"
        },
        name:String,
        discount:{
          type:Number, 
          min:1,
          max:100
        }
    },
    status:{
        type:String,
        enum:["placed","shipped","delivered","canceled","refunded"],
        default:"placed"
    },
    payment:{
        type:String,
        enum:["visa","cach"],
        default:"cach"
    },
},{timestamps: true});

orderSchema.virtual("finalPrice").get(function () {
    return this.couponId
    ? Number.parseFloat(
        this.price - (this.price * this.couponId.discount) / 100
    ).toFixed(2)
    : this.price;
});

export const Order = mongoose.model.Order || model("Order",orderSchema); 

 