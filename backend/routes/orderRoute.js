import express from "express";
import {
  getAllOrders,
  getUserOrders,
  createOrder,
  updateOrderStatus
} from "../controllers/orderController.js";
import adminAuth from "../middleware/adminAuth.js";
import userAuth from "../middleware/userAuth.js";

const orderRouter = express.Router();

// Routes admin
orderRouter.get("/all", adminAuth, getAllOrders);
orderRouter.put("/status", adminAuth, updateOrderStatus);

// Routes utilisateur
orderRouter.get("/user", userAuth, getUserOrders);
orderRouter.post("/create", userAuth, createOrder);

export default orderRouter; 