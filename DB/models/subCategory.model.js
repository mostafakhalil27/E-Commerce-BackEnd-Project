import mongoose, { Schema, Types, model } from "mongoose";

const subCategorySchema= new Schema({
    name:{
      type:String, 
      required: true, 
      min:5, 
      max: 20
    },
    slug:{
      type:String, 
      required: true
    },
    image:{
        url:{
          type: String, 
          required: true
        },
        id:{
          type: String, 
          required: true
        }
    },
    createdBy: {
      type: Types.ObjectId, 
      required: true,
      ref: "User"
    },
    categoryId: {
      type: Types.ObjectId, 
      required: true,
      ref: "Category" 
    },
    brandId: {
      type: Types.ObjectId, 
      required: true,
      ref:"Brand" 
    }
},{timestamps: true, toJSON:{virtuals: true}, toObject:{virtuals:true}});

export const SubCategory= mongoose.model.SubCategory || model("subCategory",subCategorySchema);