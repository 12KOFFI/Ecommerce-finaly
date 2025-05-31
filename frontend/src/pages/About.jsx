import React from 'react';
import Title from '../components/Title';

const About = () => {
  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      {/* Hero Section */}
      <div className="relative h-[400px] rounded-2xl overflow-hidden mb-16">
        <img
          src="https://images.unsplash.com/photo-1520333789090-1afc82db536a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
          alt="Notre équipe"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
          <div className="p-8 text-white">
            <h1 className="text-4xl font-bold mb-4">Notre Histoire</h1>
            <p className="text-lg max-w-2xl">
              Découvrez comment nous sommes devenus leaders dans la vente de produits électroniques de qualité
            </p>
          </div>
        </div>
      </div>

      <div className="text-center mb-12">
        <Title text1="À" text2="PROPOS" />
      </div>

      <div className="space-y-16">
        {/* Notre Histoire avec image */}
        <section className="grid md:grid-cols-2 gap-8 items-center">
          <div className="bg-white rounded-lg p-8 shadow-sm">
            <h2 className="text-2xl font-semibold mb-4">Notre Histoire</h2>
            <p className="text-gray-600 leading-relaxed">
              Fondée en 2024, notre entreprise est née de la passion pour la technologie et de la volonté 
              d'offrir aux consommateurs une expérience d'achat en ligne exceptionnelle. Nous avons 
              commencé comme une petite boutique en ligne et avons grandi pour devenir l'un des leaders 
              du marché de l'électronique grand public.
            </p>
          </div>
          <div className="rounded-lg overflow-hidden shadow-sm">
            <img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt="Notre histoire"
              className="w-full h-[300px] object-cover"
            />
          </div>
        </section>

        {/* Notre Mission avec image */}
        <section className="grid md:grid-cols-2 gap-8 items-center">
          <div className="rounded-lg overflow-hidden shadow-sm order-2 md:order-1">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt="Notre mission"
              className="w-full h-[300px] object-cover"
            />
          </div>
          <div className="bg-white rounded-lg p-8 shadow-sm order-1 md:order-2">
            <h2 className="text-2xl font-semibold mb-4">Notre Mission</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Notre mission est de rendre la technologie accessible à tous en offrant :
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Des produits de qualité supérieure à des prix compétitifs</li>
              <li>Un service client exceptionnel</li>
              <li>Une expérience d'achat simple et agréable</li>
              <li>Des conseils d'experts pour guider vos choix</li>
            </ul>
          </div>
        </section>

        {/* Nos Valeurs */}
        <section className="bg-white rounded-lg p-8 shadow-sm">
          <h2 className="text-2xl font-semibold mb-8 text-center">Nos Valeurs</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gradient-to-b from-orange-50 to-white rounded-lg">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="font-semibold mb-3">Excellence</h3>
              <p className="text-gray-600">Nous visons l'excellence dans chaque aspect de notre service</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-b from-orange-50 to-white rounded-lg">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="font-semibold mb-3">Confiance</h3>
              <p className="text-gray-600">Nous construisons des relations durables basées sur la confiance</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-b from-orange-50 to-white rounded-lg">
              <div className="text-4xl mb-4">💡</div>
              <h3 className="font-semibold mb-3">Innovation</h3>
              <p className="text-gray-600">Nous embrassons l'innovation et les nouvelles technologies</p>
            </div>
          </div>
        </section>

        {/* Notre Équipe avec image */}
        <section className="grid md:grid-cols-2 gap-8 items-center">
          <div className="bg-white rounded-lg p-8 shadow-sm">
            <h2 className="text-2xl font-semibold mb-4">Notre Équipe</h2>
            <p className="text-gray-600 leading-relaxed">
              Notre équipe est composée de passionnés de technologie, d'experts en service client 
              et de professionnels dévoués qui travaillent ensemble pour vous offrir la meilleure 
              expérience possible. Nous sommes fiers de notre diversité et de notre engagement 
              envers l'excellence.
            </p>
          </div>
          <div className="rounded-lg overflow-hidden shadow-sm">
            <img
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt="Notre équipe"
              className="w-full h-[300px] object-cover"
            />
          </div>
        </section>

        {/* Engagement Qualité avec image */}
        <section className="grid md:grid-cols-2 gap-8 items-center">
          <div className="rounded-lg overflow-hidden shadow-sm order-2 md:order-1">
            <img
              src="https://images.unsplash.com/photo-1434626881859-194d67b2b86f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80"
              alt="Engagement qualité"
              className="w-full h-[300px] object-cover"
            />
          </div>
          <div className="bg-white rounded-lg p-8 shadow-sm order-1 md:order-2">
            <h2 className="text-2xl font-semibold mb-4">Notre Engagement Qualité</h2>
            <p className="text-gray-600 leading-relaxed">
              Nous nous engageons à offrir uniquement des produits authentiques et de haute qualité. 
              Chaque article est soigneusement sélectionné et vérifié avant d'être proposé à la vente. 
              Nous travaillons directement avec les fabricants et les distributeurs autorisés pour 
              garantir l'origine et la qualité de nos produits.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
