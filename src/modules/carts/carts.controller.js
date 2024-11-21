import { Carts } from "../../../DB/models/carts.model.js";
import { Product } from "../../../DB/models/product.model.js";

//add to cart
export const addToCart= async (req, res, next)=>{
    const {productId, quantity}= req.body;
    const product = await Product.findById(productId);
    if(!product) 
    return next(new Error("Product not found", {cause:404}));
    if(quantity > product.availableItems) { 
        return next(new Error(`sorry, only ${product.availableItems} items is avilable`))};
    const cart = await Carts.findOne({userId:req.user._id});
    cart.products.push({ productId, quantity });
    await cart.save();
    return res.json({success: true, results: cart, message:"Product added successfully"});    
};

//userCart
export const userCart= async (req, res, next)=>{
    const cart= await Carts.findOne({userId: req.user._id})
    .populate(
        "products.productId",
        "name price discount finalPrice"
    );
    return res.json({success: true, results: cart});
};

//updateCart
export const updateCart= async(req, res, next)=>{
    const {productId, quantity}= req.body;
    const product = await Product.findById(productId);
    if(!product) 
    return next(new Error("Product not found", {cause:404}));
    if(quantity > product.avilableItems) {return next(
        new Error(`sorry, only ${product.avilableItems} items is avilable`))};
    const cart = await Carts.findOneAndUpdate({userId: req.user._id,"products.productId":productId},
        {$set:{"products.$.quantity":quantity}},{new: true});
    await cart.save();
    return res.json({success: true, results: cart, message:"Cart updated successfully"});
};

//remove product from card
export const removeProductFromCart= async(req, res, next)=>{
    const cart= await Carts.findOneAndUpdate(
        {userId: req.user._id},
        {$pull:{products:{productId:req.params.productId}}},
        {new: true}
    );
    return res.json({success: true, results: cart});
};

//clearCart
export const clearCart= async(req, res, next)=>{
    const cart = await Carts.findOneAndUpdate(
        {userId: req.user._id},
        {products:[]},
        {new: true});
    return res.json({success:true, message: "cart cleaned", results:cart});
};