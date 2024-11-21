import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { isAuthenticated } from "../../middleware/authenticated.js";
import { fileUpload, fileValidation } from "../../utils/multer.cloud.js";
import { isValid } from "../../middleware/validation.js";
import { createSubCategorySchema, deleteSubCategorySchema, updateSubCategorySchema } from "./subCategory.validation.js";// deleteSubCategorySchema, updateSubCategorySchema
import { createSubCategory, deleteSubCategory, getAllSubCategories, updateSubCategory} from "./subCategory.controller.js";//, deleteSubCategory, getAllSubCategories, updateSubCategory 
import { isAuthorized } from "../../middleware/authorization.js";
const router= Router({mergeParams:true}); // to read any params

//create category
router.post("/",
isAuthenticated, isAuthorized("admin"),
fileUpload(fileValidation).single("subCategory"),
isValid(createSubCategorySchema),  
asyncHandler(createSubCategory));

//update category
router.patch("/:subCategoryId",
isAuthenticated,isAuthorized("admin"),
fileUpload(fileValidation).single("subCategory"),
isValid(updateSubCategorySchema),
asyncHandler(updateSubCategory));

//delete category
router.delete("/:subCategoryId",
isAuthenticated,isAuthorized("admin"),
isValid(deleteSubCategorySchema),
asyncHandler(deleteSubCategory))

// // read
router.get("/", asyncHandler(getAllSubCategories));

export default router;