import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div>
          <img src={assets.logo} alt="" className="mb-5 w-32" />
          <p className="w-full md:w-2/3 text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas ea
            deleniti voluptate, reiciendis voluptates assumenda veritatis enim
            eius nisi, beatae perspiciatis expedita impedit totam voluptatem
            sapiente in? Eius, vero unde.
          </p>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>Home</li>
            <li>About</li>
            <li>Delivery</li>
            <li>Privacy</li>
          </ul>
        </div>

        <div>
          <p className="text-xl font-medium mb-5"> Get IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+2250141382595</li>
            <li>isaacndri5@gmail.com</li>
          </ul>
        </div>
      </div>

      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          {" "}
          Copyright 2025@ forever.com -All rght reserved{" "}
        </p>
      </div>
    </div>
  );
};

export default Footer;
