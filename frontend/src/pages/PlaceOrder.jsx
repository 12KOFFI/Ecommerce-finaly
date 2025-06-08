import React, { useContext, useState } from "react";
import Title from "../components/Title";
import { CartTotal } from "../components/CartTotal";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { backendUrl } from "../config/config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaPaypal, FaCcMastercard, FaCashRegister } from "react-icons/fa";
import { ImMobile } from "react-icons/im";
import { MdLocalAtm } from "react-icons/md";

const PlaceOrder = () => {
  const [method, setMethod] = useState("paypal");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { cartItems, products, clearCart, currency } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    country: "",
    phone: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateTotal = () => {
    let total = 0;
    for (const [productId, quantity] of Object.entries(cartItems)) {
      const product = products.find(p => p._id === productId);
      if (product) {
        total += product.price * quantity;
      }
    }
    return total;
  };

  const handlePlaceOrder = async () => {
    try {
      // Vérifier si l'utilisateur est connecté
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Veuillez vous connecter pour passer une commande");
        navigate("/login");
        return;
      }

      // Vérifier si le panier est vide
      if (Object.keys(cartItems).length === 0) {
        toast.error("Votre panier est vide");
        return;
      }

      // Vérifier si tous les champs sont remplis
      const fieldNames = {
        firstName: 'prénom',
        lastName: 'nom',
        email: 'email',
        street: 'rue',
        city: 'ville',
        country: 'pays',
        phone: 'téléphone'
      };

      for (const [key, value] of Object.entries(formData)) {
        if (!value.trim()) {
          toast.error(`Veuillez remplir votre ${fieldNames[key]}`);
          return;
        }
      }

      setLoading(true);

      // Préparer les données de la commande
      const orderItems = Object.entries(cartItems).map(([productId, quantity]) => {
        const product = products.find(p => p._id === productId);
        return {
          productId,
          name: product.name,
          price: product.price,
          quantity,
          image: product.image[0]
        };
      });

      const shippingAddress = `${formData.street}, ${formData.city}, ${formData.country}`;

      const orderData = {
        items: orderItems,
        totalAmount: calculateTotal() + 10,
        shippingAddress,
        paymentMethod: method
      };

      // Envoyer la commande au serveur
      const response = await axios.post(
        `${backendUrl}/api/orders/create`,
        orderData,
        {
          headers: { token }
        }
      );

      if (response.data.success) {
        toast.success("Commande passée avec succès !");
        clearCart();
        navigate("/orders");
      } else {
        toast.error(response.data.message || "Échec de la création de la commande");
      }
    } catch (error) {
      console.error("Erreur lors de la création de la commande:", error);
      toast.error(error.response?.data?.message || "Échec de la création de la commande");
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour afficher le résumé du panier
  const CartSummary = () => {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">Résumé de la commande</h2>
        <div className="space-y-4">
          {Object.entries(cartItems).map(([productId, quantity]) => {
            const product = products.find(p => p._id === productId);
            if (!product) return null;
            return (
              <div key={productId} className="flex items-center gap-4">
                <img src={product.image[0]} alt={product.name} className="w-16 h-16 object-cover rounded" />
                <div className="flex-1">
                  <h3 className="text-sm font-medium">{product.name}</h3>
                  <p className="text-sm text-gray-500">Quantité: {quantity}</p>
                </div>
                <p className="font-medium">{currency}{Math.round(product.price * quantity)}</p>
              </div>
            );
          })}
          <div className="border-t pt-4 mt-4">
            <div className="flex justify-between text-sm">
              <span>Sous-total</span>
              <span>{currency}{Math.round(calculateTotal())}</span>
            </div>
            <div className="flex justify-between text-sm mt-2">
              <span>Frais de livraison</span>
              <span>{currency}10.00</span>
            </div>
            <div className="flex justify-between font-semibold text-lg mt-4">
              <span>Total</span>
              <span>{currency}{Math.round(calculateTotal() + 10)}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Formulaire de livraison */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold mb-6">Informations de livraison</h2>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Koffi"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Abdoul"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="koffi.abdoul@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="+225 07 01 02 03 04"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
                  <input
                    type="text"
                    name="street"
                    value={formData.street}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Rue des Cocotiers, Abidjan"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ville</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Abidjan"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Pays</label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Côte d'Ivoire"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Méthode de paiement */}
            <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
  <input
    type="radio"
    name="payment"
    value="paypal"
    checked={method === "paypal"}
    onChange={(e) => setMethod(e.target.value)}
    className="w-4 h-4 text-orange-600"
  />
  <div className="flex items-center gap-4">
    <div className="flex items-center gap-2">
      <FaPaypal className="w-6 h-6 text-gray-600" />
      <p className="font-medium">PayPal</p>
    </div>
    <p className="text-sm text-gray-500">Paiement sécurisé via PayPal</p>
  </div>
</label>

<label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
  <input
    type="radio"
    name="payment"
    value="wave"
    checked={method === "wave"}
    onChange={(e) => setMethod(e.target.value)}
    className="w-4 h-4 text-orange-600"
  />
  <div className="flex items-center gap-4">
    <div className="flex items-center gap-2">
      <ImMobile className="w-6 h-6 text-gray-600" />
      <p className="font-medium">Wave</p>
    </div>
    <p className="text-sm text-gray-500">Paiement mobile sécurisé via Wave</p>
  </div>
</label>

<label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
  <input
    type="radio"
    name="payment"
    value="cod"
    checked={method === "cod"}
    onChange={(e) => setMethod(e.target.value)}
    className="w-4 h-4 text-orange-600"
  />
  <div className="flex items-center gap-4">
    <div className="flex items-center gap-2">
      <MdLocalAtm className="w-6 h-6 text-gray-600" />
      <p className="font-medium">Paiement à la livraison</p>
    </div>
    <p className="text-sm text-gray-500">Payez en espèces à la livraison</p>
  </div>
</label>
          </div>

          {/* Résumé de la commande */}
          <div className="lg:w-[400px]">
            <CartSummary />
            <button
              onClick={handlePlaceOrder}
              disabled={loading}
              className={`w-full mt-6 py-4 text-white font-medium rounded-lg transition-colors ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-orange-500 hover:bg-orange-700"
              }`}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Traitement en cours...</span>
                </div>
              ) : (
                "Valider la commande"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
