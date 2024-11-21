import { Category } from "../../../DB/models/category.model.js";
import cloudinary from "../../utils/cloud.js";
import slugify from "slugify";

//create
export const createCategory= async (req, res, next)=>{
    if(!req.file)
    return next(new Error("category image is required"));
    const {secure_url, public_id} = await cloudinary.uploader.upload(
        req.file.path,
        {folder: `${process.env.FOLDER_CLOUD_NAME}/category`}
    );
    const category= await Category.create({
        name: req.body.name,
        createdBy: req.user._id,
        image: {id: public_id, url: secure_url},
        slug: slugify(req.body.name),
        brandId: req.body.brandId
    });
    //send response
    return res.status(201).json({success: true, results: category});
};


//update
export const updateCategory= async (req, res, next)=>{
    //check category
    const category= await Category.findById(req.params.categoryId);
    if(!category) 
    next(new Error("Category not found"));
    //check if there is name save it
    category.name = req.body.name ? req.body.name : category.name;
    //slug
    category.slug= req.body.name ? slugify(req.body.name) : category.slug;
    //file
    if(req.file){
        const {secure_url} = await cloudinary.uploader.upload(
            req.file.path,
            {public_id: category.image.id}
        );
        category.image.url= secure_url
    };
    //save category
    await category.save();
    //response
    return res.json({success: true, message: "Updated successfuly"});
};

//deleteCategory
export const deleteCategory= async (req, res, next)=>{
    const category = await Category.findById(req.params.categoryId);
    if(!category) 
    next(new Error("Category not found"));
    //delete image
    const results= await cloudinary.uploader.destroy(category.image.id);
    //delete category
    await category.remove;
    return res.json({success: true, message: "category deleted"})
};

//get category with subCategory
export const getAllCategory= async (req, res, next)=>{
    const category= await Category.find().populate([{path:"subCategories"} , {path:"brandId", select:"name"}]);
    return res.json({success: true, results: category});
};