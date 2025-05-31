import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axios from "axios";
import { backendUrl } from "../config/config";
import { toast } from "react-toastify";
import ConfirmModal from "../components/ConfirmModal";

const Orders = () => {
  const { currency, navigate } = useContext(ShopContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

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
      console.error("Erreur lors du chargement des commandes:", error);
      setLoading(false);
    }
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await axios.delete(`${backendUrl}/api/orders/${orderId}`, {
        headers: { token }
      });

      if (response.data.success) {
        toast.success("Commande supprimée avec succès");
        fetchOrders();
      } else {
        toast.error(response.data.message || "Échec de la suppression de la commande");
      }
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
      toast.error(error.response?.data?.message || "Échec de la suppression de la commande");
    }
  };

  const openDeleteModal = (orderId) => {
    setSelectedOrderId(orderId);
    setModalOpen(true);
  };

  useEffect(() => {
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
          <Title text1={"MES"} text2={"COMMANDES"} />
        </div>
        <div className="text-center text-gray-600">
          Veuillez vous connecter pour voir vos commandes
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="border-t pt-16">
        <div className="text-2xl mb-8">
          <Title text1={"MES"} text2={"COMMANDES"} />
        </div>
        <div className="text-center text-gray-600">
          Vous n'avez pas encore passé de commande
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

  const getStatusText = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'En attente';
      case 'processing':
        return 'En traitement';
      case 'shipped':
        return 'Expédié';
      case 'delivered':
        return 'Livré';
      case 'cancelled':
        return 'Annulé';
      default:
        return status;
    }
  };

  const canEditOrder = (status) => {
    const nonEditableStatuses = ['shipped', 'delivered'];
    return !nonEditableStatuses.includes(status.toLowerCase());
  };

  return (
    <div className="border-t pt-16">
      <div className="text-2xl mb-8">
        <Title text1={"MES"} text2={"COMMANDES"} />
      </div>
      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white rounded-lg shadow-sm border p-6"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm text-gray-600">Commande N°: {order._id}</p>
                <p className="text-sm text-gray-600">
                  Date: {new Date(order.date).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${getStatusColor(order.status)}`}></div>
                <p className="text-sm font-medium">{getStatusText(order.status)}</p>
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
                      <p>Quantité: {item.quantity}</p>
                      <p>
                        Prix: {currency}
                        {item.price}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t flex justify-between items-center">
              <div className="text-right">
                <p className="text-sm text-gray-600">Montant total:</p>
                <p className="text-lg font-medium">
                  {currency}
                  {order.totalAmount}
                </p>
              </div>
              <div className="flex gap-2">
                {canEditOrder(order.status) && (
                  <button
                    onClick={() => navigate(`/edit-order/${order._id}`)}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Modifier
                  </button>
                )}
                {order.status === 'pending' && (
                  <button
                    onClick={() => openDeleteModal(order._id)}
                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Supprimer
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <ConfirmModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={() => {
          if (selectedOrderId) {
            handleDeleteOrder(selectedOrderId);
          }
          setModalOpen(false);
        }}
        title="Supprimer la commande"
        message="Êtes-vous sûr de vouloir supprimer cette commande ? Cette action est irréversible."
      />
    </div>
  );
};

export default Orders;
