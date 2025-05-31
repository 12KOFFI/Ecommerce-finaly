import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const { products, search, selectedCategory, setSelectedCategory } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relavent");

  const categories = [
    { value: "Écouteurs", label: "Écouteurs" },
    { value: "Casques", label: "Casques" },
    { value: "Montres", label: "Montres Connectées" },
    { value: "Smartphones", label: "Smartphones" },
    { value: "Ordinateurs", label: "Ordinateurs" },
    { value: "Tablettes", label: "Tablettes" },
    { value: "Caméras", label: "Caméras" },
    { value: "Jeux vidéos & Consoles", label: "Jeux vidéos & Consoles" }
  ];

  const subCategories = [
    { value: "Haut de gamme", label: "Haut de gamme" },
    { value: "Milieu de gamme", label: "Milieu de gamme" },
    { value: "Entrée de gamme", label: "Entrée de gamme" },
    { value: "Promotions", label: "Promotions" },
    { value: "Nouveautés", label: "Nouveautés" }
  ];

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    let productsCopy = products.slice();

    if (search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      );
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }

    setFilterProducts(productsCopy);
  };

  const sortProducts = () => {
    let fpCopy = filterProducts.slice();
    switch (sortType) {
      case "low-high":
        setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
        break;
      case "high-low":
        setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    if (selectedCategory) {
      setCategory([selectedCategory]);
      setSelectedCategory("");
    }
  }, [selectedCategory]);

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, products]);

  useEffect(() => {
    sortProducts();
  }, [sortType]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* Section des filtres */}
      <div className="min-w-64 bg-white rounded-lg shadow-sm p-4">
        <div className="flex items-center justify-between mb-4">
          <p className="text-xl font-medium text-gray-800">Filtres</p>
          <img
            onClick={() => setShowFilter(!showFilter)}
            className={`h-3 cursor-pointer sm:hidden transition-transform duration-300 ${showFilter ? "rotate-180" : ""}`}
            src={assets.dropdown_icon}
            alt="Afficher/Masquer les filtres"
          />
        </div>

        {/* Catégories */}
        <div className={`space-y-4 ${showFilter ? "" : "hidden"} sm:block`}>
          <div className="border-t pt-4">
            <p className="mb-3 font-medium text-gray-700">Catégories</p>
            <div className="flex flex-col gap-2.5">
              {categories.map((cat) => (
                <label key={cat.value} className="flex items-center gap-2 cursor-pointer hover:text-gray-900">
                  <input
                    type="checkbox"
                    value={cat.value}
                    onChange={toggleCategory}
                    checked={category.includes(cat.value)}
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm">{cat.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Sous-catégories */}
          <div className="border-t pt-4">
            <p className="mb-3 font-medium text-gray-700">Gamme de prix</p>
            <div className="flex flex-col gap-2.5">
              {subCategories.map((subCat) => (
                <label key={subCat.value} className="flex items-center gap-2 cursor-pointer hover:text-gray-900">
                  <input
                    type="checkbox"
                    value={subCat.value}
                    onChange={toggleSubCategory}
                    checked={subCategory.includes(subCat.value)}
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm">{subCat.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Section des produits */}
      <div className="flex-1">
        <div className="flex justify-between items-center mb-6">
          <Title text1={"NOTRE"} text2={"COLLECTION"} />

          {/* Tri des produits */}
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="px-4 py-2 text-sm border rounded-lg bg-white shadow-sm cursor-pointer hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="relavent">Trier par : Pertinence</option>
            <option value="low-high">Trier par : Prix croissant</option>
            <option value="high-low">Trier par : Prix décroissant</option>
          </select>
        </div>

        {/* Grille des produits */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.map((item, index) => (
            <ProductItem
              key={index}
              name={item.name}
              id={item._id}
              image={Array.isArray(item.image) ? item.image[0] : item.image}
              price={item.price}
            />
          ))}
        </div>

        {/* Message si aucun produit */}
        {filterProducts.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            Aucun produit ne correspond à vos critères de recherche
          </div>
        )}
      </div>
    </div>
  );
};

export default Collection;
