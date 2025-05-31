import React from "react";
import { Routes , Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Orders from "./pages/Orders";
import About from "./pages/About";
import Collection from "./pages/Collection";
import Cart from "./pages/Cart";
import PlaceOrder from "./pages/PlaceOrder";
import Product from "./pages/Product";
import Contact from "./pages/Contact";
import Help from "./pages/Help";
import MyProfile from "./pages/MyProfile";
import EditOrder from "./pages/EditOrder";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import { ToastContainer, toast } from 'react-toastify';
console.log(toast);

import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  return  (
  <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
    <ToastContainer  />
     <Navbar/> 

     {/* mes routes vers mes differents pages*/}
      <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/collection" element={<Collection/>}/>
      <Route path="/help" element={<Help/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/contact" element={<Contact/>}/>
      <Route path="/product/:productId" element={<Product/>}/>
      <Route path="/cart" element={<Cart/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/place-order" element={<PlaceOrder/>}/>
      <Route path="/orders" element={<Orders/>}/>
      <Route path="/my-profile" element={<MyProfile/>}/>
      <Route path="/edit-order/:orderId" element={<EditOrder/>}/>
      </Routes>

      <Footer/>
    
     </div>
)
}

export default App;
