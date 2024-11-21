import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { isAuthenticated } from "../../middleware/authenticated.js";
import { isAuthorized } from "../../middleware/authorization.js";
import { isValid } from "../../middleware/validation.js";
import { createCouponSchema, deleteCouponSchema, updateCouponScrma } from "./coupon.validation.js";
import { createCoupon, deleteCoupon, getAll, updateCoupon } from "./coupon.controller.js";
const router = Router();

//creation
router.post("/",isAuthenticated, isAuthorized("admin"),isValid(createCouponSchema),asyncHandler(createCoupon));

//update
router.patch("/:code",isAuthenticated, isAuthorized("admin"), isValid(updateCouponScrma), asyncHandler(updateCoupon))

//delete
router.delete("/:code",isAuthenticated,isAuthorized("admin"),isValid(deleteCouponSchema),asyncHandler(deleteCoupon))

//getAll
router.get("/",asyncHandler(getAll));

export default router;