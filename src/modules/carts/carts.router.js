import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { isAuthenticated } from "../../middleware/authenticated.js";
import { isValid } from "../../middleware/validation.js";
import { addToCartSchema, removeProductFromCartSchema, updateCartSchema } from "./carts.validation.js";
import { addToCart, clearCart, removeProductFromCart, updateCart, userCart } from "./carts.controller.js";
const router= Router();


//add product to cart
router.post("/",isAuthenticated, isValid(addToCartSchema),asyncHandler(addToCart));

//user cart
router.get("/",isAuthenticated,asyncHandler(userCart));

//update cart
router.patch("/", isAuthenticated, isValid(updateCartSchema) ,asyncHandler(updateCart));

// removeProductFromCard
router.patch("/remove/:productId",isAuthenticated,isValid(removeProductFromCartSchema) ,asyncHandler(removeProductFromCart))

//clearCart
router.patch("/clear",isAuthenticated,asyncHandler(clearCart));

export default router;