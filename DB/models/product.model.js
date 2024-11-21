import mongoose, { Schema, model, Types } from "mongoose";

export const productSchema =new Schema({
    name:{
      type:String, 
      required: true, 
      min:2, 
      max: 20
    },
    desciption:{type:String},
    image:[{
        id:{
          type: String, 
          required: true
        },
        url:{
          type: String, 
          required: true
        }
    }],
    defaultImage:{
        id:{
          type: String, 
          required: true
        },
        url:{
          type: String, 
          required: true
        }
    },
    availableItems:{
      type:Number, 
      min:1 , 
      required: true
    },
    soldItems:{
      type:Number, 
      default: 0
    },
    price:{
      type:Number, 
      min:1 , 
      required: true
    },
    discount:{
      type:Number, 
      min:1, 
      max: 100
    },
    createdBy:{
      type: Types.ObjectId, 
      ref:"User", 
      required: true
    },
    categoryId:{
      type: Types.ObjectId, 
      ref:"Category"
    },
    subCategoryId:{
      type: Types.ObjectId, 
      ref:"subCategory"
    },
    brandId:{
      type: Types.ObjectId, 
      ref:"Brand"
    },
    cloudFolder:{
      type: String, 
      unique: true
    }
},{timestamps:true, strictQuery: true, toJSON:{virtuals:true}});

//virtual
productSchema.virtual("finelPrice").get(function() {
    if(this.price){return Number.parseFloat( this.price - (this.price * this.discount || 0)/100).toFixed(2);}
});

export const Product= mongoose.model.Product || model("Product", productSchema);

