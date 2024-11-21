import { Brand } from "../../../DB/models/brand.model.js";
import cloudinary from "../../utils/cloud.js";
import slugify from "slugify";

export const createBrand= async (req, res, next)=>{
    if(!req.file) return next(new Error("Brand image is required"));
    const {secure_url, public_id} = await cloudinary.uploader.upload(
        req.file.path,
        {folder: `${process.env.FOLDER_CLOUD_NAME}/brand`}
    );
    const brand= await Brand.create({
        name: req.body.name,
        createdBy: req.user._id,
        image: {id: public_id, url: secure_url},
        slug: slugify(req.body.name)
        // subCategoryId: req.body.subCategoryId
    });
    //send response
    return res.status(201).json({success: true, results: brand});
};

export const updateBrand= async (req, res, next)=>{
    //check brand
    const brand= await Brand.findById(req.params.brandId);
    if(!brand) next(new Error("brand not found"));
    //check if there is name save it
    brand.name = req.body.name ? req.body.name : brand.name;
    //slug
    brand.slug= req.body.name ? slugify(req.body.name) : brand.slug;
    //file
    if(req.file){
        const {secure_url} = await cloudinary.uploader.upload(
            req.file.path,
            {public_id: brand.image.id}
        );
        brand.image.url= secure_url
    };
    //save brand
    await brand.save();
    //response
    return res.json({success: true, message: "Updated Successfuly"});
};

//deletebrand
export const deleteBrand= async (req, res, next)=>{
    const brand= await Brand.findById(req.params.brandId);
    if(!brand) next(new Error("Brand not found"));
    //delete image
    const results= await cloudinary.uploader.destroy(brand.image.id);
    //delete brand
    await brand.remove;
    return res.json({success: true, message: "Brand deleted"})
};

//get brand
export const getAllBrand= async (req, res, next)=>{
    const brand= await Brand.find();
    return res.json({success: true, results: brand});
};