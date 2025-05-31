import express from "express";
import {
  getAllOrders,
  getUserOrders,
  createOrder,
  updateOrderStatus,
  deletePendingOrder,
  deleteOrder,
  updateShippingAddress
} from "../controllers/orderController.js";
import adminAuth from "../middleware/adminAuth.js";
import userAuth from "../middleware/userAuth.js";

const orderRouter = express.Router();

// Routes admin
orderRouter.get("/all", adminAuth, getAllOrders);
orderRouter.put("/status", adminAuth, updateOrderStatus);
orderRouter.delete("/:orderId", adminAuth, deleteOrder);

// Routes utilisateur
orderRouter.get("/user", userAuth, getUserOrders);
orderRouter.post("/create", userAuth, createOrder);
orderRouter.delete("/:orderId", userAuth, deletePendingOrder);
orderRouter.put("/address", userAuth, updateShippingAddress);

export default orderRouter; 