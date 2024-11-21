import slugify from "slugify";
import { Category } from "../../../DB/models/category.model.js";
import { SubCategory } from "../../../DB/models/subCategory.model.js";
import cloudinary from "../../utils/cloud.js";

//create sub category
export const createSubCategory= async (req, res, next)=>{
    const {categoryId}= req.params;
    // check file
    if(!req.file) 
    return next(new Error("image is required", {cause: 400}));
    //check category
    const category= await Category.findById(categoryId);
    if(!category) 
    return next(new Error("category not found"));
    //upload image
    const {secure_url, public_id} = await cloudinary.uploader.upload(
        req.file.path,
        {
            folder:`${process.env.FOLDER_CLOUD_NAME}/subCategory`
        }
    )
    //save in db
    const subCategory= await SubCategory.create({
        name: req.body.name,
        slug: slugify(req.body.name) ,
        image:{id: public_id, url: secure_url},
        createdBy: req.user._id,
        categoryId,
        brandId: req.body.brandId
    });
    return res.json({success: true, results: subCategory});
};

//updateSubCategory
export const updateSubCategory= async (req, res, next)=>{
    //check category
    const category = await Category.findById(req.params.categoryId);
    if(!category) 
    return next(new Error("category not found", {cause: 404}));
    //check subCategory
    const subCategory = await SubCategory.findById(req.params.subCategoryId);
    if(!subCategory) 
    return next(new Error("Sub category not found", {cause: 404}));
    //if there is name in body
    subCategory.name = req.body.name ? req.body.name : subCategory.name;
    subCategory.slug = req.body.name ? slugify(req.body.name) : subCategory.slug;
    // check file
    if(req.file){
        const {secure_url}= await cloudinary.uploader.upload(
            req.file.path,
            {public_id: subCategory.image.id}
        );
        subCategory.image.url= secure_url
    }
    await subCategory.save();
    return res.json({success: true, message: "updated", results: subCategory});
}

// //deleteSubCategory
export const deleteSubCategory= async (req, res, next)=>{
    //check category
    const category = await Category.findById(req.params.categoryId);
    if(!category) 
    return next(new Error("category not found", {cause: 404}));
    //check subCategory
    const subCategory = await SubCategory.findById(req.params.subCategoryId);
    if(!subCategory) 
    return next(new Error("Sub category not found", {cause: 404}));
    //delete image
    const results= await cloudinary.uploader.destroy(subCategory.image.id);
    //delete category
    await subCategory.remove;
    return res.json({success: true, message: "category deleted"})
};

// read
export const getAllSubCategories= async(req, res, next)=>{
    const results= await SubCategory.find().populate([{
        path: "categoryId",
        populate:[{path:"createdBy"}]
    },
    {
        path: "brandId",
        select: "name"
    }
]);
    return res.json({success: true, results});
};

