import React, { useContext, useState } from "react";
import Title from "../components/Title";
import { CartTotal } from "../components/CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { backendUrl } from "../config/config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { cartItems, products, clearCart } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
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
        state: 'région',
        zipcode: 'code postal',
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

      const shippingAddress = `${formData.street}, ${formData.city}, ${formData.state} ${formData.zipcode}, ${formData.country}`;

      const orderData = {
        items: orderItems,
        totalAmount: calculateTotal(),
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

  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
      {/*-----------------Left Side----------------------*/}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"INFORMATIONS"} text2={"DE LIVRAISON"} />
        </div>

        <div className="flex gap-3">
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            placeholder="Prénom"
          />
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            placeholder="Nom"
          />
        </div>

        <input
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Adresse email"
        />
        <input
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="text"
          name="street"
          value={formData.street}
          onChange={handleInputChange}
          placeholder="Rue"
        />
        <div className="flex gap-3">
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            placeholder="Ville"
          />
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            placeholder="Région"
          />
        </div>
        <div className="flex gap-3">
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            name="zipcode"
            value={formData.zipcode}
            onChange={handleInputChange}
            placeholder="Code postal"
          />
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            placeholder="Pays"
          />
        </div>
        <input
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          placeholder="Téléphone"
        />
      </div>

      {/* --------------------------Right Side------------------------- */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>

        <div className="mt-12">
          <Title text1={"MODE DE"} text2={"PAIEMENT"} />

          {/*........................Payment Method Selection---------------------*/}
          <div className="flex gap-3 flex-col lg:flex-row">
            <div
              onClick={() => setMethod("stripe")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "stripe" ? "bg-green-400" : ""
                }`}
              ></p>
              <img className="h-5 mx-4" src={assets.stripe_logo} alt="Stripe" />
            </div>
            <div
              onClick={() => setMethod("razorpay")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "razorpay" ? "bg-green-400" : ""
                }`}
              ></p>
              <img className="h-5 mx-4" src={assets.razorpay_logo} alt="Razorpay" />
            </div>

            <div
              onClick={() => setMethod("cod")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "cod" ? "bg-green-400" : ""
                }`}
              ></p>
              <p className="text-gray-500 text-sm font-medium mx-4">
                PAIEMENT À LA LIVRAISON
              </p>
            </div>
          </div>

          <div className="w-full text-end mt-8">
            <button
              onClick={handlePlaceOrder}
              disabled={loading}
              className={`bg-black text-white px-16 py-3 text-sm ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "COMMANDE EN COURS..." : "PASSER LA COMMANDE"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
