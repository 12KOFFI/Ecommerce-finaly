import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";

const Contact = () => {
  return (
    <div className="bg-white">
      <div className="text-center text-2xl pt-12 border-t">
        <Title text1={"CONTACTEZ"} text2={"NOUS"} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="my-16 flex flex-col md:flex-row gap-16 items-center">
          <div className="w-full md:w-1/2">
            <img
              className="w-full h-[500px] object-cover rounded-lg shadow-xl"
              src={assets.contact_img}
              alt="Notre magasin"
            />
          </div>
          
          <div className="w-full md:w-1/2 space-y-12">
            <div className="bg-white rounded-xl shadow-sm p-8 hover:shadow-lg transition-shadow duration-300">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Notre Magasin</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <svg className="w-6 h-6 text-gray-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <p className="text-gray-700">10122 isaac-stone</p>
                    <p className="text-gray-700">Abidjan, Côte d'Ivoire</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <svg className="w-6 h-6 text-gray-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div>
                    <p className="text-gray-700">Tél: (+225) 0141382595</p>
                    <p className="text-gray-700">Email: isaacndri5@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-8 hover:shadow-lg transition-shadow duration-300">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Carrières chez Forever</h2>
              <p className="text-gray-700 mb-6">
                Découvrez nos équipes et nos opportunités d'emploi. Rejoignez-nous dans 
                notre mission de transformer l'expérience du shopping en ligne.
              </p>
              <button className="bg-black text-white px-8 py-4 rounded-lg hover:bg-gray-800 transition-colors duration-300">
                Explorer les Postes
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-8 hover:shadow-lg transition-shadow duration-300">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Heures d'Ouverture</h2>
              <div className="space-y-2">
                <p className="text-gray-700">Lundi - Vendredi: 9h00 - 20h00</p>
                <p className="text-gray-700">Samedi: 9h00 - 18h00</p>
                <p className="text-gray-700">Dimanche: Fermé</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <NewsletterBox />
        </div>
      </div>
    </div>
  );
};

export default Contact;
