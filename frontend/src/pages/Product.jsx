import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart, navigate } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");

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
              onClick={() => addToCart(productData._id)}
              className="bg-white border border-black text-black px-5 py-3 text-sm active:bg-gray-700 rounded-2xl mb-3 sm:mb-0 w-45"
            >
              AJOUTER AU PANIER
            </button>
            <button
              onClick={() => {
                addToCart(productData._id);
                navigate("/place-order");
              }}
              className="bg-black text-white px-5 py-3 text-sm active:bg-gray-700 sm:ml-4 rounded-2xl w-45"
            >
              ACHETER MAINTENANT
            </button>
          </div>

          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/* Description & Review Section */}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 text-sm py-3">Description</b>
          <p className="border px-5 py-3 text-sm">Reviews(122)</p>
        </div>

        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>
            An e-commerce website is an online platform that facilitates the buying and selling of
            products or services over the internet. It serves as a virtual marketplace where
            businesses and individuals can showcase their products, interact with customers, and
            conduct transactions without the need for a physical presence. E-commerce websites have
            gained immense popularity due to their convenience, accessibility, and the global reach
            they offer.
          </p>
          <p>
            E-commerce websites typically display products or services along with detailed
            descriptions, images, and prices. Each product usually has its own dedicated page with
            relevant information.
          </p>
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
