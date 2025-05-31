import { useState, useEffect } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState("tous");

  const statusOptions = [
    { value: "tous", label: "Tous" },
    { value: "pending", label: "En attente" },
    { value: "processing", label: "En traitement" },
    { value: "shipped", label: "Expédié" },
    { value: "delivered", label: "Livré" },
    { value: "cancelled", label: "Annulé" }
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
      console.error("Erreur lors du chargement des commandes:", error);
      toast.error("Impossible de charger les commandes");
      setLoading(false);
    }
  };

  const deleteOrder = async (orderId) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette commande ?")) {
      try {
        const response = await axios.delete(
          `${backendUrl}/api/orders/${orderId}`,
          { headers: { token } }
        );

        if (response.data.success) {
          toast.success("Commande supprimée avec succès");
          fetchOrders();
        } else {
          toast.error(response.data.message || "Échec de la suppression");
        }
      } catch (error) {
        console.error("Erreur lors de la suppression:", error);
        toast.error("Impossible de supprimer la commande");
      }
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
        toast.success("Statut de la commande mis à jour avec succès");
        fetchOrders();
      } else {
        toast.error(response.data.message || "Échec de la mise à jour du statut");
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour du statut:", error);
      toast.error("Impossible de mettre à jour le statut de la commande");
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

  const getStatusLabel = (statusValue) => {
    const status = statusOptions.find(s => s.value === statusValue);
    return status ? status.label : statusValue;
  };

  const getPaymentMethodLabel = (method) => {
    const paymentMethods = {
      'paypal': 'PayPal',
      'wave': 'Wave',
      'cod': 'Paiement à la livraison'
    };
    return paymentMethods[method] || method;
  };

  const filteredOrders = selectedStatus === "tous"
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
        <h1 className="text-2xl font-bold">Gestion des Commandes</h1>
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Filtrer par statut :</label>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="border rounded-md px-3 py-1.5 text-sm"
          >
            {statusOptions.map(status => (
              <option key={status.value} value={status.value}>
                {status.label}
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
                  N° de commande : <span className="font-medium">{order._id}</span>
                </p>
                <p className="text-sm text-gray-600">
                  Client : <span className="font-medium">{order.userName}</span>
                </p>
                <p className="text-sm text-gray-600">
                  Date : {new Date(order.date).toLocaleString('fr-FR')}
                </p>
                <p className="text-sm text-gray-600">
                  Mode de paiement : <span className="font-medium">{getPaymentMethodLabel(order.paymentMethod)}</span>
                </p>
                <p className="text-sm text-gray-600">
                  Statut actuel : <span className="font-medium">{getStatusLabel(order.status)}</span>
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
                    {statusOptions.filter(status => status.value !== "tous").map(status => (
                      <option key={status.value} value={status.value}>
                        {status.label}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  onClick={() => deleteOrder(order._id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                  title="Supprimer la commande"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="mt-4">
              <h3 className="font-medium mb-2">Articles commandés :</h3>
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
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/64x64?text=Image+non+disponible';
                      }}
                    />
                    <div className="flex-1">
                      <h4 className="font-medium">{item.name}</h4>
                      <div className="text-sm text-gray-600">
                        <p>Quantité : {item.quantity}</p>
                        <p>
                          Prix : {currency}
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
                <p>Adresse de livraison :</p>
                <p className="font-medium">{order.shippingAddress}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Montant total :</p>
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
            Aucune commande trouvée pour le statut sélectionné
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
