import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { CartTotal } from "../components/CartTotal";
import { toast } from "react-toastify";

const Cart = () => {
  const { products, cartItems, currency, updateQuantity, navigate } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const tempData = [];
    for (const itemId in cartItems) {
      if (cartItems[itemId] > 0) {
        tempData.push({
          _id: itemId,
          quantity: cartItems[itemId],
        });
      }
    }
    setCartData(tempData);
  }, [cartItems]);

  if (cartData.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center border-t">
        <div className="text-2xl mb-6">
          <Title text1={"VOTRE"} text2={"PANIER"} />
        </div>
        <div className="text-center">
          <p className="text-gray-600 mb-6">Votre panier est vide</p>
          <button
            onClick={() => navigate("/collection")}
            className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Continuer vos achats
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[60vh] border-t pt-14">
      <div className="text-2xl mb-8">
        <Title text1={"VOTRE"} text2={"PANIER"} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
        <div className="space-y-6">
          {cartData.map((item, index) => {
            const productData = products.find((product) => product._id === item._id);
            if (!productData) return null;

            return (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm p-6 transition-all hover:shadow-md"
              >
                <div className="flex flex-col sm:flex-row items-start gap-6">
                  <div className="relative group w-full sm:w-32 h-32">
                    <img 
                      className="w-full h-full object-cover rounded-lg" 
                      src={productData.image[0]} 
                      alt={productData.name}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/128x128?text=Image+non+disponible';
                      }}
                    />
                    <button
                      onClick={() => {
                        updateQuantity(item._id, 0);
                        toast.success("Produit retiré du panier");
                      }}
                      className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Supprimer"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="flex-1 space-y-4">
                    <div>
                      <h3 className="text-lg font-medium hover:text-blue-600 cursor-pointer" onClick={() => navigate(`/product/${item._id}`)}>
                        {productData.name}
                      </h3>
                      <div className="mt-2 space-y-1 text-sm text-gray-600">
                        {productData.brand && (
                          <p><span className="font-medium">Marque :</span> {productData.brand}</p>
                        )}
                        {productData.color && (
                          <p><span className="font-medium">Couleur :</span> {productData.color}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-6">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateQuantity(item._id, Math.max(1, item.quantity - 1))}
                          className="w-8 h-8 flex items-center justify-center border rounded-full hover:bg-gray-100"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => {
                            const value = Number(e.target.value);
                            if (!isNaN(value) && value > 0) {
                              updateQuantity(item._id, value);
                            }
                          }}
                          className="w-16 text-center border rounded-lg py-1"
                        />
                        <button
                          onClick={() => updateQuantity(item._id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center border rounded-full hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                      <p className="text-lg font-medium">
                        {currency}
                        {(productData.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 h-fit">
          <CartTotal />
          <button
            onClick={() => navigate("/place-order")}
            className="w-full bg-black text-white py-3 rounded-lg mt-6 hover:bg-gray-800 transition-colors"
          >
            Passer la commande
          </button>
          <button
            onClick={() => navigate("/collection")}
            className="w-full border border-black text-black py-3 rounded-lg mt-4 hover:bg-gray-50 transition-colors"
          >
            Continuer vos achats
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
