import React, { useContext, useState, useEffect } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [userData, setUserData] = useState(null);
  const [showCategories, setShowCategories] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const {
    getCartCount,
    token,
    setToken,
    setCartItems,
    backendUrl,
    setSelectedCategory,
    search,
    setSearch
  } = useContext(ShopContext);

  const categories = [
    { value: "Écouteurs", label: "Écouteurs" },
    { value: "Casques", label: "Casques" },
    { value: "Montres Connectées", label: "Montres Connectées" },
    { value: "Smartphones", label: "Smartphones" },
    { value: "Ordinateurs", label: "Ordinateurs" },
    { value: "Tablettes", label: "Tablettes" },
    { value: "Caméras", label: "Caméras" },
    { value: "Jeux vidéos & Consoles", label: "Jeux vidéos & Consoles" }
  ];

  useEffect(() => {
    if (token) {
      fetchUserData();
    }
  }, [token]);

  // Empêcher le défilement du body quand le menu est ouvert
  useEffect(() => {
    if (visible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [visible]);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/user/profile`, {
        headers: { token }
      });
      if (response.data.success) {
        setUserData(response.data.user);
      }
    } catch (error) {
      console.error('Erreur lors du chargement du profil:', error);
    }
  };

  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
    setUserData(null);
  };

  const handleCategoryClick = (categoryValue) => {
    setShowCategories(false);
    setSelectedCategory(categoryValue);
    navigate('/collection');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (location.pathname !== '/collection') {
      navigate('/collection');
    }
  };

  return (
    <>
      <div className="flex items-center justify-between py-4 font-medium relative border-b">
        <Link to="/">
          <span className="text-2xl font-bold text-orange-600">TechMarket</span>
          <hr className="w-full h-1 bg-orange-600" />
        </Link>
        
        {/* Search bar */}
        <div className="hidden md:flex items-center flex-1 max-w-2xl mx-8">
          <form onSubmit={handleSearch} className="relative w-full">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher des produits, marques et catégories..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
            />
            <button 
              type="submit"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
            >
              <img
                src={assets.search_icon}
                className="w-5"
                alt="Search"
              />
            </button>
          </form>
        </div>

        <div className="flex items-center gap-6">
          {/* Account dropdown */}
          <div className="hidden md:block group relative">
            <button className="flex items-center gap-2 hover:text-orange-600 transition-colors">
              <img src={assets.profile_icon} className="w-5" alt="Profile" />
              <span>{token ? (userData?.name || "Account") : "Account"}</span>
            </button>

            <div className="invisible group-hover:visible absolute right-0 pt-4 z-50 w-64 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <div className="bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden">
                {token ? (
                  <>
                    <div className="px-6 py-4 bg-gray-50 border-b">
                      <p className="font-medium text-gray-800">{userData?.name}</p>
                      <p className="text-sm text-gray-500 truncate">{userData?.email}</p>
                    </div>
                    <div className="py-2">
                      <Link to="/my-profile" className="flex items-center px-6 py-2 text-gray-600 hover:bg-orange-50 hover:text-orange-600 transition-colors">
                        <span>My Profile</span>
                      </Link>
                      <Link to="/orders" className="flex items-center px-6 py-2 text-gray-600 hover:bg-orange-50 hover:text-orange-600 transition-colors">
                        <span>My Orders</span>
                      </Link>
                      <button onClick={logout} className="w-full text-left px-6 py-2 text-gray-600 hover:bg-orange-50 hover:text-orange-600 transition-colors">
                        <span>Logout</span>
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="py-4 px-6">
                    <Link to="/login" className="block w-full py-2 px-4 text-center bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
                      Login
                    </Link>
                    <p className="text-sm text-gray-500 text-center mt-2">
                      New customer?{" "}
                      <Link to="/login" className="text-orange-600 hover:underline">
                        Create account
                      </Link>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Cart */}
          <Link to="/cart" className="relative hover:text-orange-600 transition-colors">
            <img src={assets.cart_icon} className="w-5 min-w-5" alt="Cart" />
            <span className="absolute -right-2 -bottom-2 w-5 h-5 flex items-center justify-center bg-orange-600 text-white text-xs rounded-full">
              {getCartCount()}
            </span>
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setVisible(true)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <img src={assets.menu_icon} className="w-5" alt="Menu" />
          </button>
        </div>
      </div>

      {/* Categories bar */}
      <div className="hidden md:block border-b bg-white">
        <div className="flex items-center justify-center gap-8 py-3">
          <button
            className="flex items-center gap-2 hover:text-orange-600 transition-colors"
            onClick={() => setShowCategories(!showCategories)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <span>All Categories</span>
          </button>

          <nav className="hidden md:flex gap-6">
            <NavLink to="/" className="hover:text-orange-600 transition-colors">
              HOME
            </NavLink>
            <NavLink to="/collection" className="hover:text-orange-600 transition-colors">
              COLLECTION
            </NavLink>
            <NavLink to="/help" className="hover:text-orange-600 transition-colors">
              AIDE
            </NavLink>
           
          </nav>
        </div>

        {/* Categories dropdown */}
        {showCategories && (
          <div className="absolute left-0 right-0 bg-white border-b shadow-lg z-50">
            <div className="grid grid-cols-4 gap-6 p-6 max-w-7xl mx-auto">
              {categories.map((category) => (
                <button 
                  key={category.value}
                  onClick={() => handleCategoryClick(category.value)}
                  className="p-4 text-center rounded-lg hover:bg-orange-50 hover:text-orange-600 transition-all duration-300"
                >
                  <h3 className="font-medium text-gray-900 hover:text-orange-600 transition-colors">
                    {category.label}
                  </h3>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Mobile menu overlay */}
      {visible && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setVisible(false)}
        />
      )}

      {/* Mobile menu */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-[280px] bg-white z-50 transform transition-transform duration-300 ease-in-out ${
          visible ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">Menu</h2>
            <button
              onClick={() => setVisible(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            {token && (
              <div className="px-4 py-3 bg-gray-50 border-b">
                <p className="font-medium text-gray-900">{userData?.name}</p>
                <p className="text-sm text-gray-500">{userData?.email}</p>
              </div>
            )}

            <nav className="p-4 space-y-1">
              <NavLink
                to="/"
                onClick={() => setVisible(false)}
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-lg transition-colors ${
                    isActive ? 'bg-orange-50 text-orange-600' : 'text-gray-600 hover:bg-gray-50'
                  }`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/collection"
                onClick={() => setVisible(false)}
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-lg transition-colors ${
                    isActive ? 'bg-orange-50 text-orange-600' : 'text-gray-600 hover:bg-gray-50'
                  }`
                }
              >
                Collection
              </NavLink>
              <NavLink
                to="/about"
                onClick={() => setVisible(false)}
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-lg transition-colors ${
                    isActive ? 'bg-orange-50 text-orange-600' : 'text-gray-600 hover:bg-gray-50'
                  }`
                }
              >
                About
              </NavLink>
              <NavLink
                to="/contact"
                onClick={() => setVisible(false)}
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-lg transition-colors ${
                    isActive ? 'bg-orange-50 text-orange-600' : 'text-gray-600 hover:bg-gray-50'
                  }`
                }
              >
                Contact
              </NavLink>
            </nav>

            <div className="p-4 border-t">
              {token ? (
                <div className="space-y-1">
                  <Link
                    to="/my-profile"
                    onClick={() => setVisible(false)}
                    className="block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    My Profile
                  </Link>
                  <Link
                    to="/orders"
                    onClick={() => setVisible(false)}
                    className="block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    My Orders
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setVisible(false);
                    }}
                    className="block w-full px-4 py-2 text-left text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setVisible(false)}
                  className="block w-full py-2 text-center bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
