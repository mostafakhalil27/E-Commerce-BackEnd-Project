import { nanoid } from "nanoid";
import cloudinary from "../../utils/cloud.js";
import { Product } from "../../../DB/models/product.model.js";
import { Category } from "../../../DB/models/category.model.js";

//add Product
export const addProduct= async (req, res, next)=>{
    // files
    if(!req.files) 
    return next(new Error("product images is required", {cause:400}));
    // unique folder name
    const cloudFolder= nanoid();
    // upload sub images
    let image= [];
    for(const file of req.files.subImages){
        const {secure_url, public_id} = await cloudinary.uploader.upload(
            file.path,
            {folder:`${process.env.FOLDER_CLOUD_NAME}/products/${cloudFolder}`}
        );
        image.push({id:public_id, url: secure_url}); 
    }
    // upload default image
    const {secure_url, public_id} = await cloudinary.uploader.upload(
        req.files.defaultImage[0].path,
        {folder:`${process.env.FOLDER_CLOUD_NAME}/products/${cloudFolder}`}
    );
    //create
    const product = await Product.create({
        ...req.body,
        cloudFolder,
        createdBy: req.user._id,
        defaultImage: {id: public_id, url: secure_url},
        image
    });
    //send response
    return res.json({success: true, results: product})
};

//delete 
export const deleteProduct= async (req, res, next)=>{
    //check product
    const product= await Product.findById(req.params.productId);
    if(!product) 
    return next(new Error("Product not found"));
    //check owner
    if(req.user._id.toString() != product.createdBy.toString()) 
    next(new Error("Not authorized"));
    // delete product frm Db
    await Product.findByIdAndDelete(req.params.productId);
    //response
    return res.json({success: true, message: "Deleted"});
};

//getAllProducts
export const getAllProducts= async (req, res, next)=>{
    if(req.params.categoryId){
        let {page} =req.query;
        page =! page || page<1 || isNaN(page) ? 1 : page;
        const limit = 2
        const skip = limit*(page-1) 
        const category= await Category.findById(req.params.categoryId);
        if(!category) 
        return next(new Error("category not found", {cause:404}))
        const product = await Product.find({categoryId:req.params.categoryId}).skip(skip).limit(limit);
        return res.json({success: true, results: product});
    };
};

//single Product
export const singleProduct= async(req, res, next)=>{
    const product= await Product.findById(req.params.productId);
    return res.json({success: true, results: product})
};