import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [search, setSearch] = useState("");
  const [cartItems, setCartItems] = useState(() => {
    // Initialiser le panier depuis le localStorage
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : {};
  });
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();

  // Sauvegarder le panier dans le localStorage à chaque modification
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = async (itemId) => {
    toast.success("Produit ajouté au panier avec succès");

    setCartItems((prev) => {
      const updatedCart = {
        ...prev,
        [itemId]: (prev[itemId] || 0) + 1,
      };
      return updatedCart;
    });
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const itemId in cartItems) {
      try {
        if (cartItems[itemId] > 0) {
          totalCount += cartItems[itemId];
        }
      } catch (error) {
        console.error("Erreur dans getCartCount:", error);
      }
    }
    return totalCount;
  };

  const updateQuantity = (itemId, quantity) => {
    setCartItems((prev) => {
      const updatedCart = {
        ...prev,
        [itemId]: quantity,
      };
      // Supprimer l'article si la quantité est 0
      if (quantity <= 0) {
        delete updatedCart[itemId];
      }
      return updatedCart;
    });
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      const itemInfo = products.find((product) => product._id === itemId);
      try {
        if (cartItems[itemId] > 0 && itemInfo) {
          totalAmount += itemInfo.price * cartItems[itemId];
        }
      } catch (error) {
        console.error("Erreur dans getCartAmount:", error);
      }
    }
    return totalAmount;
  };

  const getProductsData = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error("Échec du chargement des produits. Veuillez réessayer.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Échec du chargement des produits. Veuillez réessayer.");
    }
  };

  useEffect(() => {
    getProductsData();
  }, []);

  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  const clearCart = () => {
    setCartItems({});
    localStorage.removeItem("cartItems"); // Nettoyer aussi le localStorage
  };

  // Fonction pour retirer un article du panier
  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev };
      delete updatedCart[itemId];
      return updatedCart;
    });
  };

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    cartItems,
    setCartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    token,
    setToken,
    clearCart,
    removeFromCart,
    selectedCategory,
    setSelectedCategory,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
