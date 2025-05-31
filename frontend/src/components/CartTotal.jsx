import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";

export const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);
  const subtotal = getCartAmount();
  const total = subtotal === 0 ? 0 : subtotal + delivery_fee;

  return (
    <div className="w-full">
      <div className="text-xl font-semibold mb-6">Résumé de la commande</div>

      <div className="space-y-4">
        <div className="flex justify-between items-center text-gray-600">
          <p>Sous-total</p>
          <p className="font-medium">{currency}{subtotal.toFixed(2)}</p>
        </div>

        <div className="flex justify-between items-center text-gray-600">
          <p>Frais de livraison</p>
          <p className="font-medium">{currency}{delivery_fee.toFixed(2)}</p>
        </div>

        <div className="h-px bg-gray-200 my-2"></div>

        <div className="flex justify-between items-center text-lg font-semibold">
          <p>Total</p>
          <p>{currency}{total.toFixed(2)}</p>
        </div>

        <p className="text-sm text-gray-500 mt-4">
          Les taxes et frais de livraison sont calculés à la caisse
        </p>
      </div>
    </div>
  );
};
