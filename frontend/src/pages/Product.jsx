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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Product Data */}
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Product Images */}
        <div className="flex-1 flex flex-col-reverse lg:flex-row gap-6">
          {/* Thumbnails */}
          <div className="flex lg:flex-col overflow-x-auto lg:overflow-y-auto gap-4 lg:w-24 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer transition-all duration-200 ${
                  image === item ? 'ring-2 ring-blue-500' : 'hover:opacity-80'
                }`}
                alt={`${productData.name} - vue ${index + 1}`}
              />
            ))}
          </div>
          {/* Main Image */}
          <div className="flex-1">
            <div className="aspect-w-1 aspect-h-1 rounded-2xl overflow-hidden bg-gray-100">
              <img 
                className="w-full h-full object-cover object-center" 
                src={image} 
                alt={productData.name}
              />
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1 flex flex-col">
          <div className="pb-6 border-b border-gray-200">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{productData.name}</h1>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {[...Array(4)].map((_, i) => (
                  <img key={i} src={assets.star_icon} alt="star" className="w-5 h-5" />
                ))}
                <img src={assets.star_dull_icon} alt="star" className="w-5 h-5" />
              </div>
              <p className="text-sm text-gray-500">(122 avis)</p>
            </div>
            <p className="text-4xl font-bold text-gray-900">
              {currency}{productData.price}
            </p>
          </div>

          <div className="py-6 space-y-4 border-b border-gray-200">
            <div className="flex items-center">
              <span className="w-24 text-sm text-gray-500">Marque</span>
              <span className="text-sm font-medium text-gray-900">{productData.brand}</span>
            </div>
            <div className="flex items-center">
              <span className="w-24 text-sm text-gray-500">Couleur</span>
              <span className="text-sm font-medium text-gray-900">{productData.color}</span>
            </div>
          </div>

          <div className="py-6 border-b border-gray-200">
            <p className="text-base text-gray-600 leading-relaxed">
              {productData.description}
            </p>
          </div>

          <div className="py-6 space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => {
                  const token = localStorage.getItem("token");
                  if (!token) {
                    toast.error("Veuillez vous connecter pour ajouter au panier");
                    navigate("/login");
                    return;
                  }
                  addToCart(productData._id);
                }}
                className="flex-1 bg-white border-2 border-gray-900 text-gray-900 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200"
              >
                Ajouter au panier
              </button>
              <button
                onClick={handleBuyNow}
                disabled={loading}
                className={`flex-1 bg-gray-900 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${
                  loading 
                    ? "opacity-50 cursor-not-allowed" 
                    : "hover:bg-gray-800"
                }`}
              >
                {loading ? "Traitement..." : "Acheter maintenant"}
              </button>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <p>Produit 100% authentique</p>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p>Paiement à la livraison disponible</p>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z" />
                </svg>
                <p>Retour et échange faciles sous 7 jours</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Description & Review Section */}
      <div className="mt-16">
        <div className="border-b border-gray-200">
          <nav className="flex gap-8">
            <button className="border-b-2 border-gray-900 py-4 text-sm font-medium text-gray-900">
              Description
            </button>
            <button className="py-4 text-sm font-medium text-gray-500 hover:text-gray-700">
              Avis (122)
            </button>
          </nav>
        </div>

        <div className="py-8 prose prose-sm max-w-none text-gray-600">
          <p>{productData.description}</p>
        </div>
      </div>

      {/* Related Products Section */}
      <div className="mt-16 border-t border-gray-200 pt-16">
        <RelatedProducts
          category={productData.category}
          subCategory={productData.subCategory}
        />
      </div>
    </div>
  );
};

export default Product;
