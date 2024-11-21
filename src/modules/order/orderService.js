import { Carts } from "../../../DB/models/carts.model.js"
import { Product } from "../../../DB/models/product.model.js";

//clear cart
export const clearCart= async(userId)=>{
    await Carts.findOneAndUpdate({userId},{products:[]});
};

//update stock
export const updateStock= async(products, placeOrder)=>{
    //placeOrder 
    //true
    //false
    if(placeOrder){
        for(const product of products){
            await Product.findByIdAndUpdate(product.productId,{
                $inc:{
                    avilableItems:-product.quantity,
                    soldItems: product.quantity
                }
            });
        };
    }else{
        for(const product of products){
            await Product.findByIdAndUpdate(product.productId,{
                $inc:{
                    avilableItems:product.quantity,
                    soldItems: -product.quantity
                }
            });
        };
    }
};