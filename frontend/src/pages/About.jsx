import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
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
              src={assets.about_img}
              alt="À propos de notre entreprise"
            />
          </div>
          <div className="flex flex-col justify-center gap-8 md:w-1/2">
            <p className="text-lg leading-relaxed text-gray-700">
              Forever est né d'une passion pour l'innovation et d'un désir de révolutionner 
              la façon dont les gens font leurs achats en ligne. Notre aventure a commencé 
              avec une idée simple : offrir une plateforme où les clients peuvent facilement 
              découvrir, explorer et acheter une large gamme de produits depuis le confort 
              de leur domicile.
            </p>
            <p className="text-lg leading-relaxed text-gray-700">
              Depuis notre création, nous travaillons sans relâche pour proposer une sélection 
              diversifiée de produits de haute qualité qui répondent à tous les goûts et 
              préférences. De la mode aux appareils électroniques, en passant par les 
              essentiels du quotidien, nous offrons une collection extensive provenant de 
              marques et fournisseurs de confiance.
            </p>
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Notre Mission</h3>
              <p className="text-lg leading-relaxed text-gray-700">
                Notre mission chez Forever est d'offrir aux clients le choix, la commodité 
                et la confiance. Nous nous engageons à fournir une expérience d'achat 
                fluide qui dépasse les attentes, de la navigation à la livraison.
              </p>
            </div>
          </div>
        </div>

        <div className="text-2xl py-12">
          <Title text1={"POURQUOI"} text2={"NOUS CHOISIR"} />
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="bg-white rounded-xl shadow-sm p-8 hover:shadow-lg transition-shadow duration-300">
            <div className="flex flex-col gap-4">
              <h3 className="text-xl font-semibold text-gray-900">Assurance Qualité</h3>
              <p className="text-gray-700 leading-relaxed">
                Nous sélectionnons et vérifions méticuleusement chaque produit pour 
                garantir qu'il répond à nos normes de qualité strictes.
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-8 hover:shadow-lg transition-shadow duration-300">
            <div className="flex flex-col gap-4">
              <h3 className="text-xl font-semibold text-gray-900">Simplicité</h3>
              <p className="text-gray-700 leading-relaxed">
                Avec notre interface conviviale et notre processus de commande simplifié, 
                faire ses achats n'a jamais été aussi facile.
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-8 hover:shadow-lg transition-shadow duration-300">
            <div className="flex flex-col gap-4">
              <h3 className="text-xl font-semibold text-gray-900">Service Client Exceptionnel</h3>
              <p className="text-gray-700 leading-relaxed">
                Notre équipe de professionnels dévoués est là pour vous accompagner, 
                faisant de votre satisfaction notre priorité absolue.
              </p>
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

export default About;
