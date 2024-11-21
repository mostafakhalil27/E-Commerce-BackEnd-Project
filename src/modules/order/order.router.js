import { Router } from "express";
import { isAuthenticated } from "../../middleware/authenticated.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { isValid } from "../../middleware/validation.js";
import {  cancelOrderSchema, createOrderSchema } from "./order.validation.js";
import { cancelOrder, createOrder } from "./order.controller.js";
const router = Router();

//create order
router.post("/",isAuthenticated, isValid(createOrderSchema) ,asyncHandler(createOrder));

//cancel order
router.patch("/:orderId",isAuthenticated, isValid(cancelOrderSchema), asyncHandler(cancelOrder));

export default router;