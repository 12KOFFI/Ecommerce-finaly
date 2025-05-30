import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext); // Récupération de la devise depuis le contexte
  
  return (
    <Link to={`/product/${id}`} className="text-gray-700 cursor-pointer">
      <div className="overflow-hidden rounded-lg bg-gray-100 aspect-square">
        <img
          className="w-full h-full object-cover hover:scale-110 transition ease-in-out duration-300"
          src={image}
          alt={name}
        />
      </div>
      <p className="pt-3 pb-1 text-sm line-clamp-2">{name}</p>
      <p className="text-sm font-medium">
        {currency}
        {price}
      </p>
    </Link>
  );
};

export default ProductItem;
