import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleLikeClick = (e) => {
    e.preventDefault(); // Empêcher la navigation
    setIsLiked(!isLiked);
  };
  
  return (
    <Link 
      to={`/product/${id}`} 
      className="group relative block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badge Nouveau - à adapter selon vos besoins */}
      <div className="absolute top-2 left-2 z-10">
        <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded">Nouveau</span>
      </div>

      {/* Bouton Favori */}
      <button
        onClick={handleLikeClick}
        className={`absolute top-2 right-2 z-10 p-2 rounded-full transition-all duration-300 ${
          isLiked ? 'bg-red-500' : 'bg-white shadow-md hover:bg-gray-100'
        }`}
      >
        <svg
          className={`w-5 h-5 ${isLiked ? 'text-white' : 'text-gray-600'}`}
          fill={isLiked ? "currentColor" : "none"}
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </button>

      {/* Image Container */}
      <div className="relative overflow-hidden aspect-square rounded-t-lg">
        <img
          className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
          src={Array.isArray(image) ? image[0] : image}
          alt={name}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://via.placeholder.com/300x300?text=Image+non+disponible';
          }}
        />
        
        {/* Overlay sur hover */}
        <div className={`absolute inset-0 bg-black bg-opacity-20 transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`} />
      </div>

      {/* Informations produit */}
      <div className="p-4">
        {/* Nom du produit */}
        <h3 className="text-sm text-gray-700 font-medium line-clamp-2 mb-2 min-h-[2.5rem]">
          {name}
        </h3>

        {/* Prix et promotion */}
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-bold text-gray-900">
            {currency}{price}
          </span>
          <span className="text-sm text-red-600 line-through">
            {currency}{(price * 1.2).toFixed(2)}
          </span>
          <span className="text-sm text-green-600 font-medium">-20%</span>
        </div>

        {/* Note et avis */}
        <div className="flex items-center gap-1 mt-2">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                className="w-4 h-4 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-xs text-gray-500">(45)</span>
        </div>

        {/* Badge livraison */}
        <div className="mt-3 flex items-center gap-2">
          <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-xs text-green-600">Livraison gratuite</span>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
