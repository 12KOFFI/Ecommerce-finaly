import React, { useState, useEffect } from "react";
import { assets } from "../assets/assets";

const Hero = () => {
  const sliderData = [
    {
      id: 1,
      title: "Experience Pure Sound - Your Perfect Headphones Awaits!",
      offer: "Limited Time Offer 30% Off",
      buttonText1: "Buy now",
      buttonText2: "Find more",
      imgSrc: assets.header_headphone_image,
    },
    {
      id: 2,
      title: "Next-Level Gaming Starts Here - Discover PlayStation 5 Today!",
      offer: "Hurry up only few lefts!",
      buttonText1: "Shop Now",
      buttonText2: "Explore Deals",
      imgSrc: assets.header_playstation_image,
    },
    {
      id: 3,
      title: "Power Meets Elegance - Apple MacBook Pro is Here for you!",
      offer: "Exclusive Deal 40% Off",
      buttonText1: "Order Now",
      buttonText2: "Learn More",
      imgSrc: assets.header_macbook_image,
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderData.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [sliderData.length]);

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      // Swipe left
      setCurrentSlide((prev) => (prev + 1) % sliderData.length);
    }
    if (touchStart - touchEnd < -75) {
      // Swipe right
      setCurrentSlide((prev) => (prev === 0 ? sliderData.length - 1 : prev - 1));
    }
  };

  return (
    <div className="overflow-hidden relative w-full">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${currentSlide * 100}%)`,
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {sliderData.map((slide) => (
          <div
            key={slide.id}
            className="flex flex-col-reverse md:flex-row items-center justify-between bg-[#E6E9F2] py-6 md:py-8 px-4 md:px-14 mt-3 md:mt-6 rounded-xl min-w-full"
          >
            <div className="md:pl-8 mt-6 md:mt-0 text-center md:text-left">
              <p className="text-sm md:text-base text-orange-600 font-medium mb-2 md:mb-3 animate-fadeIn">
                {slide.offer}
              </p>
              <h1 className="max-w-lg text-xl md:text-[40px] leading-tight md:leading-[48px] font-semibold mb-4 md:mb-6 animate-slideUp">
                {slide.title}
              </h1>
              <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3 md:gap-4">
                <button className="w-full sm:w-auto px-6 md:px-10 py-2.5 bg-orange-600 rounded-full text-white font-medium hover:bg-orange-700 transition-colors animate-slideUp">
                  {slide.buttonText1}
                </button>
                <button className="group flex items-center justify-center gap-2 px-6 py-2.5 font-medium hover:text-orange-600 transition-colors animate-slideUp">
                  {slide.buttonText2}
                  <img
                    className="group-hover:translate-x-1 transition-transform"
                    src={assets.arrow_icon}
                    alt="arrow_icon"
                  />
                </button>
              </div>
            </div>
            <div className="flex items-center justify-center flex-1 p-4 md:p-6">
              <img
                className="w-40 md:w-72 h-auto object-contain transform transition-transform hover:scale-105 animate-fadeIn"
                src={slide.imgSrc}
                alt={slide.title}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/300x300?text=Image+non+disponible';
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-2 mt-4 md:mt-8">
        {sliderData.map((_, index) => (
          <div
            key={index}
            onClick={() => handleSlideChange(index)}
            className={`h-2 w-2 rounded-full cursor-pointer transition-colors ${
              currentSlide === index ? "bg-orange-600 w-4" : "bg-gray-500/30"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Hero;
