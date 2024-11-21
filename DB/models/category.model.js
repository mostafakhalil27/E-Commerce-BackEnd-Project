import mongoose , {Schema , Types, model} from "mongoose"

const categorySchema= new Schema({
    name:{
      type: String, 
      required: true,
      min:4,
      max:20
    },
    slug:{
      type: String, 
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
    createdBy:{
      type: Types.ObjectId,
      required: true,
      ref: "User"
    },
    brandId:{
      type: Types.ObjectId, 
      required: true,
      ref:"Brand"
    }
},{timestamps: true, toJSON:{virtuals: true}, toObject:{virtuals:true}});

categorySchema.virtual("subCategories",{
    ref:"subCategory",
    localField: "_id",
    foreignField: "categoryId"
});

categorySchema.virtual("Product",{
    ref:"Product",
    localField: "_id",
    foreignField: "categoryId"
});

export const Category= mongoose.model.Category || model("Category", categorySchema);
