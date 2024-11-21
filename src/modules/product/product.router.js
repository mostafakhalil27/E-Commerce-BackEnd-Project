import { Router } from "express";
import { isAuthenticated } from "../../middleware/authenticated.js";
import { isAuthorized } from "../../middleware/authorization.js";
import { isValid } from "../../middleware/validation.js";
import { createProductShcema, productIdSchema, allProductSchema } from "./product.validation.js";
import { fileUpload, fileValidation } from "../../utils/multer.cloud.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { addProduct,deleteProduct,getAllProducts,singleProduct } from "./product.controller.js";
const router= Router({mergeParams: true});

//create
router.post("/",
isAuthenticated,
isAuthorized("admin"),
fileUpload(fileValidation.images).fields([
    {name: "defaultImage", maxCount:1},
    {name: "subImages", maxCount:3}
]),isValid(createProductShcema),asyncHandler(addProduct));

//delete
router.delete("/:productId",isAuthenticated,isAuthorized("admin"),isValid(productIdSchema),asyncHandler(deleteProduct));

//get all
router.get("/all",isValid(allProductSchema),asyncHandler(getAllProducts));

//singleproduct
router.get("/single/:productId", singleProduct)

export default router;