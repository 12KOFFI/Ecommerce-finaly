import React from "react";
import Hero from "../components/Hero";
import LatestCollection from "../components/LatestCollection";
import BestSeller from "../components/BestSeller";
import NewsletterBox from "../components/NewsletterBox";
import FeaturedProduct from "../components/FeaturedProduct";
import Banner from "../components/Banner";

const Home = () => {
  return (
    <div>
      <Hero />
      <LatestCollection />
      <BestSeller />
      <FeaturedProduct />
      <Banner />
      <NewsletterBox />
    </div>
  );
};

export default Home;
