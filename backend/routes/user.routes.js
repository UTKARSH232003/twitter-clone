import express from "express";
import {
	followUnFollowUser,
	getAllUsers,
	getUserProfile,
	loginUser,
	logoutUser,
	signupUser,
    updateUser,
} from "../controllers/user.controller.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

router.get("/profile/:query", getUserProfile);
router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/follow/:id", protectRoute, followUnFollowUser);
router.put("/update/:id", protectRoute, updateUser);
router.get("/people", getAllUsers);
export default router;