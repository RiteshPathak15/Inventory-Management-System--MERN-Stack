import { Router } from "express";
import { loginUser, verifyOtp,logoutUser, registerUser, getUserProfile, updateUserAvatar, getAllEmployees, updateUserProfile } from "../controllers/user.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { upload } from "../middlewares/multer.middlewares.js";

const router = Router();

router.post("/register", upload.single("avatar"), registerUser); // Route for user registration
router.post("/login", loginUser);       // Route for user login
router.post("/logout", verifyJWT, logoutUser); // Route for user logout (protected)
router.get("/me", verifyJWT, getUserProfile);  // Route for fetching user profile (protected)
router.put("/avatar", verifyJWT, upload.single("avatar"), updateUserAvatar); // Route for updating avatar (protected)
router.get("/employees", verifyJWT, getAllEmployees); // Route for fetching all employees (admin only)
router.put("/profile", verifyJWT, updateUserProfile); // Route for updating user profile (protected)
router.post("/verify-otp", verifyOtp);

export default router;
