import React, { useContext, useState, useEffect } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [userData, setUserData] = useState(null);

  const {
    setShowSearch,
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItems,
    backendUrl
  } = useContext(ShopContext);

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

  return (
    <div className="flex items-center justify-between py-5 font-medium relative">
      <Link to="/">
        {" "}
        <img src={assets.logo} className="w-36" alt="Logo" />
      </Link>
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink to="/" className=" flex flex-col items-center gap-1">
          <p>HOME</p>
          <hr className="w-2/3 border-none h-[1.6px] bg-gray-700 hidden" />
        </NavLink>

        <NavLink to="/collection" className=" flex flex-col items-center gap-1">
          <p>COLLECTION</p>
          <hr className="w-2/3 border-none h-[1.6px] bg-gray-700 hidden" />
        </NavLink>

        <NavLink to="/about" className=" flex flex-col items-center gap-1">
          <p>ABOUT</p>
          <hr className="w-2/3 border-none h-[1.6px] bg-gray-700 hidden" />
        </NavLink>

        <NavLink to="/contact" className=" flex flex-col items-center gap-1">
          <p>CONTACT</p>
          <hr className="w-2/3 border-none h-[1.6px] bg-gray-700 hidden" />
        </NavLink>
      </ul>

      <div className="flex items-center gap-5">
        <img
          onClick={() => setShowSearch(true)}
          src={assets.search_icon}
          className="w-5 cursor-pointer"
          alt="Search"
        />

        <div className="group relative">
          <img
            onClick={() => (token ? null : navigate("/login"))}
            src={assets.profile_icon}
            className="w-5 cursor-pointer"
            alt="Profile"
          />

          {/* Dropdown menu for profile */}
          {token && (
            <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4 z-50">
              <div className="w-64 bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden">
                {/* En-tête avec info utilisateur */}
                <div className="px-6 py-4 bg-gray-50 border-b border-gray-100">
                  <p className="font-medium text-gray-800">
                    {userData?.name || 'Chargement...'}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    {userData?.email || ''}
                  </p>
                </div>

                {/* Menu items */}
                <div className="py-2">
                  <Link 
                    to="/my-profile" 
                    className="flex items-center px-6 py-2 text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Mon profil
                  </Link>

                  <Link 
                    to="/orders" 
                    className="flex items-center px-6 py-2 text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    Commandes
                  </Link>

                  <hr className="my-2 border-gray-100" />

                  <button
                    onClick={logout}
                    className="flex items-center w-full px-6 py-2 text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Déconnexion
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/*  panier*/}
        <Link to="/cart" className="relative">
          <img
            src={assets.cart_icon}
            className="w-5 min-w-5 cursor-pointer"
            alt="Cart"
          />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-neutral-950 text-white aspect-square rounded-full text-[8px]">
            {getCartCount()}
          </p>
        </Link>

        {/* Bouton menu mobile */}
        <button
          onClick={() => setVisible(true)}
          className="sm:hidden p-1 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <img
            src={assets.menu_icon}
            className="w-5 cursor-pointer"
            alt="Menu"
          />
        </button>
      </div>

      {/* Menu mobile overlay */}
      {visible && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 sm:hidden"
          onClick={() => setVisible(false)}
        />
      )}

      {/* Menu mobile */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-[280px] bg-white z-50 transform transition-transform duration-300 ease-in-out ${
          visible ? 'translate-x-0' : 'translate-x-full'
        } sm:hidden`}
      >
        <div className="flex flex-col h-full">
          {/* En-tête du menu */}
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

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto">
            <div className="py-2">
              {token && (
                <div className="px-4 py-3 bg-gray-50">
                  <p className="text-sm font-medium text-gray-900">{userData?.name}</p>
                  <p className="text-xs text-gray-500">{userData?.email}</p>
                </div>
              )}

              <div className="px-2 py-3 space-y-1">
                <NavLink
                  to="/"
                  onClick={() => setVisible(false)}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-lg transition-colors ${
                      isActive ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50'
                    }`
                  }
                >
                  Accueil
                </NavLink>

                <NavLink
                  to="/collection"
                  onClick={() => setVisible(false)}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-lg transition-colors ${
                      isActive ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50'
                    }`
                  }
                >
                  Collection
                </NavLink>

                <NavLink
                  to="/about"
                  onClick={() => setVisible(false)}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-lg transition-colors ${
                      isActive ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50'
                    }`
                  }
                >
                  À propos
                </NavLink>

                <NavLink
                  to="/contact"
                  onClick={() => setVisible(false)}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-lg transition-colors ${
                      isActive ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50'
                    }`
                  }
                >
                  Contact
                </NavLink>
              </div>

              {token && (
                <>
                  <hr className="my-2" />
                  <div className="px-2 py-3 space-y-1">
                    <NavLink
                      to="/my-profile"
                      onClick={() => setVisible(false)}
                      className="flex items-center px-3 py-2 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Mon profil
                    </NavLink>

                    <NavLink
                      to="/orders"
                      onClick={() => setVisible(false)}
                      className="flex items-center px-3 py-2 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                      Mes commandes
                    </NavLink>
                  </div>
                </>
              )}
            </div>
          </nav>

          {/* Footer du menu */}
          {token ? (
            <div className="border-t p-4">
              <button
                onClick={() => {
                  logout();
                  setVisible(false);
                }}
                className="flex items-center w-full px-3 py-2 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Déconnexion
              </button>
            </div>
          ) : (
            <div className="border-t p-4">
              <button
                onClick={() => {
                  navigate("/login");
                  setVisible(false);
                }}
                className="w-full px-4 py-2 text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Se connecter
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
