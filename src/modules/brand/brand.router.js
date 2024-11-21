import { Router } from "express";
import { isValid } from "../../middleware/validation.js";
import { createBrandSchema, deleteBrandSchema, updateBrandSchema } from "./brand.validation.js";
import { isAuthenticated } from "../../middleware/authenticated.js";
import { isAuthorized } from "../../middleware/authorization.js";
import { fileUpload, fileValidation } from "../../utils/multer.cloud.js";
import { createBrand, deleteBrand, getAllBrand, updateBrand } from "./brand.controller.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
const router= Router();

//create brand
router.post("/create",
isAuthenticated,
isAuthorized("admin"),
fileUpload(fileValidation).single("brand"),
isValid(createBrandSchema),
asyncHandler(createBrand));

//update Brand
router.patch("/update/:brandId",
isAuthenticated,isAuthorized("admin"),
fileUpload(fileValidation).single("brand"),isValid(updateBrandSchema),
asyncHandler(updateBrand));

//delete Brand
router.delete("/delete/:brandId",
isAuthenticated,isAuthorized("admin"),
isValid(deleteBrandSchema),
asyncHandler(deleteBrand));

//get categories
router.get("/",asyncHandler(getAllBrand));

export default router;