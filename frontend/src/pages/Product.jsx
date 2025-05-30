import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";
import { toast } from "react-toastify";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart, navigate } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchProductData = () => {
    products.forEach((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  const handleBuyNow = async () => {
    try {
      setLoading(true);
      
      // Vérifier si l'utilisateur est connecté
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Veuillez vous connecter pour acheter");
        navigate("/login");
        return;
      }

      // Vérifier si le produit est disponible
      if (!productData) {
        toast.error("Produit non disponible");
        return;
      }

      // Ajouter au panier et rediriger vers la page de commande
      await addToCart(productData._id);
      navigate("/place-order");
    } catch (error) {
      console.error("Erreur lors de l'achat:", error);
      toast.error("Une erreur est survenue lors de l'achat");
    } finally {
      setLoading(false);
    }
  };

  if (!productData) return <div className="opacity-0"></div>;

  return (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* Product Data */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Product Images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full scrollbar-hide">
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                alt={productData.name}
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img className="w-full h-auto" src={image} alt={productData.name} />
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="star" className="w-3 5" />
            <img src={assets.star_icon} alt="star" className="w-3 5" />
            <img src={assets.star_icon} alt="star" className="w-3 5" />
            <img src={assets.star_icon} alt="star" className="w-3 5" />
            <img src={assets.star_dull_icon} alt="star" className="w-3 5" />
            <p className="pl-2">(122)</p>
          </div>

          {/* Brand and Color */}
          <p className="mt-2 text-gray-700">
            <strong>Marque :</strong> {productData.brand}
          </p>
          <p className="mt-1 text-gray-700">
            <strong>Couleur :</strong> {productData.color}
          </p>

          <p className="mt-5 text-3xl font-medium">
            {currency}
            {productData.price}
          </p>
          <p className="mt-5 text-gray-500 md:w-4/5">{productData.description}</p>

          <div className="flex flex-col sm:flex-row items-center sm:justify-start">
            <button
              onClick={() => {
                const token = localStorage.getItem("token");
                if (!token) {
                  toast.error("Veuillez vous connecter pour ajouter au panier");
                  navigate("/login");
                  return;
                }
                addToCart(productData._id);
                toast.success("Produit ajouté au panier");
              }}
              className="bg-white border border-black text-black px-5 py-3 text-sm active:bg-gray-700 rounded-2xl mb-3 sm:mb-0 w-45"
            >
              AJOUTER AU PANIER
            </button>
            <button
              onClick={handleBuyNow}
              disabled={loading}
              className={`bg-black text-white px-5 py-3 text-sm active:bg-gray-700 sm:ml-4 rounded-2xl w-45 ${
                loading ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-800"
              }`}
            >
              {loading ? "TRAITEMENT..." : "ACHETER MAINTENANT"}
            </button>
          </div>

          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>Produit 100% authentique.</p>
            <p>Paiement à la livraison disponible.</p>
            <p>Retour et échange faciles sous 7 jours.</p>
          </div>
        </div>
      </div>

      {/* Description & Review Section */}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 text-sm py-3">Description</b>
          <p className="border px-5 py-3 text-sm">Avis (122)</p>
        </div>

        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>{productData.description}</p>
        </div>
      </div>

      {/* Related Products Section */}
      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  );
};

export default Product;
