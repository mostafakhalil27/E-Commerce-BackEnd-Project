import { Router } from "express";
import { isValid } from "../../middleware/validation.js";
import { createCategorySchema, deleteCategorySchema, updateCategorySchema } from "./category.validation.js";  //, deleteCategorySchema, updateCategorySchema
import { isAuthenticated } from "../../middleware/authenticated.js";
import { isAuthorized } from "../../middleware/authorization.js";
import { fileUpload, fileValidation } from "../../utils/multer.cloud.js";
import { createCategory, deleteCategory, getAllCategory, updateCategory } from "./category.controller.js"; //, deleteCategory, getAllCategory, updateCategory
import { asyncHandler } from "../../utils/asyncHandler.js";
import subCategoryRouter from "./../subCategory/subCategory.router.js";
import productRouter from "./../product/product.router.js";
const router= Router();

router.use("/:categoryId/subCategory", subCategoryRouter)
router.use("/:categoryId/products", productRouter)

//create category
router.post("/create",
isAuthenticated,isAuthorized("admin"),
fileUpload(fileValidation.images).single("category"),isValid(createCategorySchema),
asyncHandler(createCategory));

//update category
router.patch("/update/:categoryId",
isAuthenticated,isAuthorized("admin"),
fileUpload(fileValidation).single("category"),isValid(updateCategorySchema),
asyncHandler(updateCategory));

//delete category
router.delete("/delete/:categoryId",
isAuthenticated,isAuthorized("admin"),
isValid(deleteCategorySchema),
asyncHandler(deleteCategory));

//get all categories
router.get("/",asyncHandler(getAllCategory));

export default router;