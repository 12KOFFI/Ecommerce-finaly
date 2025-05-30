import { useState, useEffect } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState("all");

  const statusOptions = [
    "all",
    "pending",
    "processing",
    "shipped",
    "delivered",
    "cancelled"
  ];

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/orders/all`, {
        headers: { token }
      });
      if (response.data.success) {
        setOrders(response.data.orders);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to fetch orders");
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await axios.put(
        `${backendUrl}/api/orders/status`,
        {
          orderId,
          status: newStatus
        },
        {
          headers: { token }
        }
      );

      if (response.data.success) {
        toast.success("Order status updated successfully");
        fetchOrders();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Failed to update order status");
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-500';
      case 'processing':
        return 'bg-blue-500';
      case 'shipped':
        return 'bg-purple-500';
      case 'delivered':
        return 'bg-green-500';
      case 'cancelled':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const filteredOrders = selectedStatus === "all"
    ? orders
    : orders.filter(order => order.status.toLowerCase() === selectedStatus);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Orders Management</h1>
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Filter by status:</label>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="border rounded-md px-3 py-1.5 text-sm"
          >
            {statusOptions.map(status => (
              <option key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <div
            key={order._id}
            className="bg-white rounded-lg shadow-sm border p-6"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm text-gray-600">
                  Order ID: <span className="font-medium">{order._id}</span>
                </p>
                <p className="text-sm text-gray-600">
                  Customer: <span className="font-medium">{order.userName}</span>
                </p>
                <p className="text-sm text-gray-600">
                  Date: {new Date(order.date).toLocaleString()}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${getStatusColor(order.status)}`}></div>
                  <select
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                    className="border rounded px-2 py-1 text-sm"
                  >
                    {statusOptions.filter(status => status !== "all").map(status => (
                      <option key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <h3 className="font-medium mb-2">Order Items:</h3>
              <div className="space-y-3">
                {order.items.map((item) => (
                  <div
                    key={item.productId}
                    className="flex items-center gap-4 py-3 border-t"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium">{item.name}</h4>
                      <div className="text-sm text-gray-600">
                        <p>Quantity: {item.quantity}</p>
                        <p>
                          Price: {currency}
                          {item.price}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-4 border-t flex justify-between items-center">
              <div className="text-sm text-gray-600">
                <p>Shipping Address:</p>
                <p className="font-medium">{order.shippingAddress}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Total Amount:</p>
                <p className="text-lg font-medium">
                  {currency}
                  {order.totalAmount}
                </p>
              </div>
            </div>
          </div>
        ))}

        {filteredOrders.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No orders found for the selected status
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
