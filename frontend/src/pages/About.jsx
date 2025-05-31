import React from "react";
import Title from "../components/Title";
import NewsletterBox from "../components/NewsletterBox";

const About = () => {
  return (
    <div className="bg-white">
      <div className="text-2xl text-center pt-12 border-t">
        <Title text1={"À PROPOS"} text2={"DE NOUS"} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="my-16 flex flex-col md:flex-row gap-16 items-center">
          <div className="w-full md:w-1/2">
            <img
              className="w-full h-[500px] object-cover rounded-lg shadow-xl"
              src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop"
              alt="Notre vision technologique"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop';
              }}
            />
          </div>
          <div className="flex flex-col justify-center gap-8 md:w-1/2">
            <p className="text-lg leading-relaxed text-gray-700">
              Forever est né d'une passion pour l'innovation et d'un désir de révolutionner 
              la façon dont les gens font leurs achats en ligne. Notre aventure a commencé 
              avec une idée simple : offrir une plateforme où les clients peuvent facilement 
              découvrir, explorer et acheter une large gamme de produits technologiques depuis 
              le confort de leur domicile.
            </p>
            <p className="text-lg leading-relaxed text-gray-700">
              Notre mission est de rendre la technologie accessible à tous. Nous sélectionnons 
              méticuleusement chaque produit pour vous offrir ce qu'il y a de mieux en matière 
              d'innovation, de qualité et de performance. Des derniers smartphones aux accessoires 
              gaming, en passant par les équipements audio haut de gamme, nous nous engageons à 
              vous proposer une expérience d'achat exceptionnelle.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-16">
          <div className="text-center p-6 bg-gray-50 rounded-lg">
            <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-blue-100 rounded-full">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Qualité Garantie</h3>
            <p className="text-gray-600">Tous nos produits sont authentiques et garantis, avec un service après-vente réactif.</p>
          </div>

          <div className="text-center p-6 bg-gray-50 rounded-lg">
            <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-green-100 rounded-full">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Prix Compétitifs</h3>
            <p className="text-gray-600">Nous nous engageons à vous offrir les meilleurs prix du marché.</p>
          </div>

          <div className="text-center p-6 bg-gray-50 rounded-lg">
            <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-purple-100 rounded-full">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Innovation</h3>
            <p className="text-gray-600">Nous sommes toujours à l'affût des dernières innovations technologiques.</p>
          </div>
        </div>
      </div>

      <NewsletterBox />
    </div>
  );
};

export default About;
