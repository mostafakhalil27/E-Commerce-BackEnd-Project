import { Router } from "express";
import { isValid } from "../../middleware/validation.js";
import { activateAccountSchema, forgetPassCodeSchema, loginSchema, registerSchema, resetPassSchema } from "./user.validation.js";
import { activateAccount, logIn, register, resetPassword, sendForgetPassCode } from "./user.controller.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
const router= Router();

// Register
router.post("/register",isValid(registerSchema),asyncHandler(register));

// Activate Account
router.get("/confirmEmail/:activationCode", isValid(activateAccountSchema),asyncHandler(activateAccount));

// Login
router.post("/login",isValid(loginSchema),asyncHandler(logIn));

// forget code
router.patch("/forgetPassword",isValid(forgetPassCodeSchema),asyncHandler(sendForgetPassCode));

// Reset Password
router.patch("/resetPassword", isValid(resetPassSchema), asyncHandler(resetPassword))

export default router;