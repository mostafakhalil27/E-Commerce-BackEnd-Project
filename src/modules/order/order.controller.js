import { Carts } from "../../../DB/models/carts.model.js";
import { Coupon } from "../../../DB/models/coupon.model.js";
import { Order } from "../../../DB/models/order.model.js";
import { Product } from "../../../DB/models/product.model.js";
import { sendEmail } from "../../utils/sendMailer.js";
import { clearCart, updateStock } from "./orderService.js";


//createOrder
export const createOrder =async(req, res, next)=>{
    //data
    const {payment, address, phone, coupon} =req.body;
    //check coupon
    let checkCoupon;
    if(coupon){
        checkCoupon= await Coupon.findOne({
            name: coupon,
            expiredAt: {$gt:Date.now()}
        })
    if(!checkCoupon) return next(new Error("invalid coupon"));
    };
    //check cart
    const cart = await Carts.findOne({userId:req.user._id});
    const products= cart.products;
    if(products.length< 1) return next(new Error("Empty cart"));
    //check products
    let orderProducts=[];
    let orderPrice =0; 
    for (let i = 0; i < products.length; i++) {
        //check products existence
        const product= await Product.findOne(products[i].productId);
        if(!product) return next(new Error(`product ${products[i].productId} not found`));
        //check products in stock
        if(cart.products.quantity > product.availableItems) { 
            return next(new Error(`${product.name} out of stock , only ${product.avilableItems} items are left`))};
        orderProducts.push({
            productId:product._id,
            quantity:product.quantity,
            name:product.name,
            itemPrice:product.finalPrice,
            totalPrice:product.quantity *product.finalPrice
        });
        orderPrice= product.quantity *product.finalPrice
    }

    //create order
    const order= await Order.create({
        userId: req.user._id,
        payment, 
        address, 
        phone, 
        couponId:{
            id:checkCoupon?._id,
            name:checkCoupon?.name,
            discount:checkCoupon?.discount
        },
        products:{
        productId:orderProducts.productId,
        quantity:orderProducts.quantity,
        name:orderProducts.quantity,
        itemPrice:orderProducts.itemPrice,
        totalPrice:orderProducts.totalPrice,
        price:orderProducts.price
    },
    price:orderProducts.orderPrice
    });
    //send email
    const isSent= await sendEmail({
        to:req.user.email,
        subject: "Order Invoice"
    });
  
    //response
    return res.json({success: true, results:order, message:"order placed successfully, check your email"});
};

//cancelOrder
export const cancelOrder= async(req, res, next)=>{
    const order= await Order.findById(req.params.orderId);
    if(!order) 
    return next(new Error("order not found"));
    if(order.status==="shipped" || order.status==="delivered") 
        return next(new Error("can't cancel"))
    order.status="canceled";
    await order.save();
    updateStock(order.products, false);
    return res.json({success: true, message:"Order canceld successfully"});
};