import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axios from "axios";
import { backendUrl } from "../config/config";
import { toast } from "react-toastify";

const EditOrder = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { currency } = useContext(ShopContext);
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState(null);
  const [formData, setFormData] = useState({
    shippingAddress: ""
  });

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  const fetchOrder = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      // D'abord, récupérer toutes les commandes de l'utilisateur
      const response = await axios.get(`${backendUrl}/api/orders/user`, {
        headers: { token }
      });

      if (response.data.success) {
        // Trouver la commande spécifique dans la liste
        const foundOrder = response.data.orders.find(order => order._id === orderId);
        if (foundOrder) {
          setOrder(foundOrder);
          setFormData({
            shippingAddress: foundOrder.shippingAddress
          });
        } else {
          throw new Error("Commande non trouvée");
        }
      }
      setLoading(false);
    } catch (error) {
      console.error("Erreur lors du chargement de la commande:", error);
      toast.error("Impossible de charger la commande");
      navigate("/orders");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await axios.put(
        `${backendUrl}/api/orders/address`,
        {
          orderId: orderId,
          shippingAddress: formData.shippingAddress
        },
        {
          headers: { token }
        }
      );

      if (response.data.success) {
        toast.success("Adresse de livraison modifiée avec succès");
        navigate("/orders");
      }
    } catch (error) {
      console.error("Erreur lors de la modification:", error);
      toast.error(error.response?.data?.message || "Échec de la modification de l'adresse");
    }
  };

  if (loading) {
    return (
      <div className="border-t pt-16 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="border-t pt-16">
        <div className="text-center text-gray-600">
          Commande non trouvée
        </div>
      </div>
    );
  }

  return (
    <div className="border-t pt-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-2xl mb-8">
          <Title text1={"MODIFIER"} text2={"L'ADRESSE"} />
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="mb-6">
            <p className="text-sm text-gray-600">Commande N°: {order._id}</p>
            <p className="text-sm text-gray-600">
              Date: {new Date(order.date).toLocaleDateString()}
            </p>
            <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm" 
                 style={{
                   backgroundColor: order.status === 'pending' ? '#FEF3C7' : 
                                  order.status === 'processing' ? '#DBEAFE' : 
                                  order.status === 'shipped' ? '#E0E7FF' : 
                                  order.status === 'delivered' ? '#D1FAE5' : 
                                  order.status === 'cancelled' ? '#FEE2E2' : '#F3F4F6',
                   color: order.status === 'pending' ? '#92400E' : 
                          order.status === 'processing' ? '#1E40AF' : 
                          order.status === 'shipped' ? '#3730A3' : 
                          order.status === 'delivered' ? '#065F46' : 
                          order.status === 'cancelled' ? '#991B1B' : '#1F2937'
                 }}>
              {order.status === 'pending' ? 'En attente' :
               order.status === 'processing' ? 'En traitement' :
               order.status === 'shipped' ? 'Expédié' :
               order.status === 'delivered' ? 'Livré' :
               order.status === 'cancelled' ? 'Annulé' : order.status}
            </div>
          </div>

          <div className="space-y-4 mb-6">
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

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Adresse de livraison
              </label>
              <textarea
                name="shippingAddress"
                value={formData.shippingAddress}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows="3"
                placeholder="Entrez la nouvelle adresse de livraison"
              />
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Enregistrer l'adresse
              </button>
              <button
                type="button"
                onClick={() => navigate("/orders")}
                className="flex-1 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditOrder; 