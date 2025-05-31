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
    <div className="flex items-center justify-between py-5 font-medium">
      <Link to="/">
        {" "}
        <img src={assets.logo} className="w-36" alt="" />
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
          alt=""
        />

        <div className="group relative">
          <img
            onClick={() => (token ? null : navigate("/login"))}
            src={assets.profile_icon}
            className="w-5 cursor-pointer"
            alt=""
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
            alt=""
          />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-neutral-950 text-white aspect-square rounded-full text-[8px]">
            {getCartCount()}
          </p>
        </Link>
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden"
          alt=""
        />
      </div>

      {/* menu mobile condition ternaire d'affichage */}

      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
          visible ? "w-full" : "w-0"
        } `}
      >
        <div className="flex flex-col text-gray-600">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-3 cursor-pointer"
          >
            <img className="h-4 rotate-180" src={assets.dropdown_icon} alt="" />
            <p>Back</p>
          </div>

          <NavLink
            onClick={() => setVisible(false)}
            className="py-2  pl-6 border"
            to="/"
          >
            HOME
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2  pl-6 border"
            to="/collection"
          >
            COLLECTION
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2  pl-6 border"
            to="/about"
          >
            ABOUT
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2  pl-6 border"
            to="/contact"
          >
            CONTACT
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
