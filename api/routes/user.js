import express from "express";
import {
  accountActivateByCode,
  accountActivateByLink,
  forgotPassword,
  loggedInUser,
  login,
  passwordResetByLink,
  register,
  resendAccActivateEmail,
  findUserAccount,
} from "../controllers/userController.js";

// initialize
const router = express.Router();

// student routes
router.post("/register", register);
router.post("/login", login);
router.get("/me", loggedInUser);
router.get("/activate/:token", accountActivateByLink);
router.post("/activate-code", accountActivateByCode);
router.post("/resend-activation-email", resendAccActivateEmail);
router.post("/forgot-password", forgotPassword);
router.post("/forgot-password/:token", passwordResetByLink);
router.post("/find-user-account", findUserAccount);

// export moudle
export default router;
