import express from "express";
import {
  loginUser,
  registerUser,
  adminlogin,
  getUserProfile,
  updateUserProfile
} from "../controllers/userController.js";
import userAuth from "../middleware/userAuth.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/admin", adminlogin);
userRouter.get("/profile", userAuth, getUserProfile);
userRouter.put("/profile", userAuth, updateUserProfile);
 
export default userRouter;
