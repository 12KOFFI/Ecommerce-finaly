import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

// Get all orders (admin only)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await orderModel.find().sort({ date: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// Get user orders
export const getUserOrders = async (req, res) => {
  try {
    const { userId } = req;
    const orders = await orderModel.find({ userId }).sort({ date: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// Create new order
export const createOrder = async (req, res) => {
  try {
    const { items, totalAmount, shippingAddress, paymentMethod } = req.body;
    const userId = req.userId;

    // Get user name
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const order = new orderModel({
      userId,
      userName: user.name,
      items,
      totalAmount,
      shippingAddress,
      paymentMethod,
      status: 'pending',
      date: new Date()
    });

    await order.save();
    return res.status(201).json({ success: true, message: "Order created successfully", order });
  } catch (error) {
    console.error("Error creating order:", error);
    return res.status(500).json({ success: false, message: error.message || "Failed to create order" });
  }
};

// Update order status (admin only)
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    
    const order = await orderModel.findById(orderId);
    if (!order) {
      return res.json({ success: false, message: "Order not found" });
    }

    order.status = status;
    await order.save();

    res.json({ success: true, message: "Order status updated successfully" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// Delete pending order (user can only delete their own pending orders)
export const deletePendingOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const userId = req.userId;

    const order = await orderModel.findById(orderId);
    
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    // Vérifier si l'ordre appartient à l'utilisateur
    if (order.userId.toString() !== userId) {
      return res.status(403).json({ success: false, message: "Not authorized to delete this order" });
    }

    // Vérifier si la commande est en statut 'pending'
    if (order.status !== 'pending') {
      return res.status(400).json({ success: false, message: "Can only delete pending orders" });
    }

    await orderModel.findByIdAndDelete(orderId);
    return res.status(200).json({ success: true, message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error deleting order:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Delete order (admin only)
export const deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    
    const order = await orderModel.findById(orderId);
    if (!order) {
      return res.json({ success: false, message: "Commande non trouvée" });
    }

    await orderModel.findByIdAndDelete(orderId);
    res.json({ success: true, message: "Commande supprimée avec succès" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
}; 