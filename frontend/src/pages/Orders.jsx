import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axios from "axios";
import { backendUrl } from "../config/config";

const Orders = () => {
  const { currency } = useContext(ShopContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setLoading(false);
          return;
        }

        const response = await axios.get(`${backendUrl}/api/orders/user`, {
          headers: { token }
        });

        if (response.data.success) {
          setOrders(response.data.orders);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="border-t pt-16 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!localStorage.getItem("token")) {
    return (
      <div className="border-t pt-16">
        <div className="text-2xl mb-8">
          <Title text1={"MY"} text2={"ORDERS"} />
        </div>
        <div className="text-center text-gray-600">
          Please login to view your orders
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="border-t pt-16">
        <div className="text-2xl mb-8">
          <Title text1={"MY"} text2={"ORDERS"} />
        </div>
        <div className="text-center text-gray-600">
          You haven't placed any orders yet
        </div>
      </div>
    );
  }

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

  return (
    <div className="border-t pt-16">
      <div className="text-2xl mb-8">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>
      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white rounded-lg shadow-sm border p-6"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm text-gray-600">Order ID: {order._id}</p>
                <p className="text-sm text-gray-600">
                  Date: {new Date(order.date).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${getStatusColor(order.status)}`}></div>
                <p className="text-sm font-medium capitalize">{order.status}</p>
              </div>
            </div>

            <div className="space-y-4">
              {order.items.map((item) => (
                <div
                  key={item.productId}
                  className="flex items-start gap-4 py-4 border-t"
                >
                  <img
                    className="w-20 h-20 object-cover rounded"
                    src={item.image}
                    alt={item.name}
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <div className="mt-1 text-sm text-gray-600">
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

            <div className="mt-4 pt-4 border-t flex justify-between items-center">
              <div className="text-right">
                <p className="text-sm text-gray-600">Total Amount:</p>
                <p className="text-lg font-medium">
                  {currency}
                  {order.totalAmount}
                </p>
              </div>
              <button className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-800 transition-colors">
                Track Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
