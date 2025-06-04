import React, { useState } from 'react';
import Title from '../components/Title';

const Help = () => {
  const [activeSection, setActiveSection] = useState('faq');
  const [openFaq, setOpenFaq] = useState(null);

  const faqData = [
    {
      question: "Comment passer une commande ?",
      answer: "Pour passer une commande sur TechMarket :\n1. Parcourez notre catalogue de produits\n2. Ajoutez les articles souhaités à votre panier\n3. Cliquez sur l'icône du panier\n4. Vérifiez votre commande\n5. Choisissez votre mode de paiement (Orange Money, MTN Money, etc.)\n6. Confirmez votre commande"
    },
    {
      question: "Quels sont les délais de livraison ?",
      answer: "Nos délais de livraison varient selon votre localisation :\n- Abidjan : 24-48h\n- Autres villes principales : 2-4 jours\n- Autres localités : 3-7 jours\nVous recevrez un SMS de suivi dès l'expédition de votre commande."
    },
    {
      question: "Comment suivre ma commande ?",
      answer: "Vous pouvez suivre votre commande de plusieurs façons :\n1. Dans votre espace client 'Mes Commandes'\n2. Via le numéro de suivi envoyé par SMS et email\n3. En contactant notre service client au +225 07 07 07 07 07"
    },
    {
      question: "Quelle est la politique de retour ?",
      answer: "Notre politique de retour est la suivante :\n- 7 jours pour changer d'avis\n- L'article doit être dans son état d'origine\n- Emballage d'origine intact\n- Contactez notre service client pour initier un retour\n- Les frais de retour sont à la charge du client"
    },
    {
      question: "Quels sont les modes de paiement acceptés ?",
      answer: "Nous acceptons les modes de paiement suivants :\n- Orange Money\n- MTN Mobile Money\n- Wave\n- Moov Money\n- Paiement à la livraison (Abidjan uniquement)"
    }
  ];

  const helpSections = [
    {
      id: 'faq',
      title: 'FAQ',
      icon: '❓'
    },
    {
      id: 'shipping',
      title: 'Livraison',
      icon: '🚚'
    },
    {
      id: 'returns',
      title: 'Retours',
      icon: '↩️'
    },
    {
      id: 'payment',
      title: 'Paiement',
      icon: '💳'
    }
  ];

  const shippingContent = (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Informations de livraison</h3>
      <div className="space-y-2">
        <p>Nous proposons plusieurs options de livraison :</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Livraison Standard Abidjan (24-48h) : 2000 FCFA</li>
          <li>Livraison Villes Principales (2-4 jours) : 3000 FCFA</li>
          <li>Livraison Autres Localités (3-7 jours) : 5000 FCFA</li>
          <li>Point Relais à Abidjan : 1000 FCFA</li>
        </ul>
      </div>
      <p>Toutes les commandes sont traitées sous 24h (jours ouvrables).</p>
    </div>
  );

  const returnsContent = (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Politique de retour</h3>
      <div className="space-y-2">
        <p>Notre politique de retour est simple et claire :</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>7 jours pour retourner votre article</li>
          <li>Article non utilisé et dans son emballage d'origine</li>
          <li>Contactez d'abord notre service client</li>
          <li>Frais de retour à la charge du client</li>
          <li>Remboursement sous 3 jours ouvrés après réception</li>
        </ul>
      </div>
    </div>
  );

  const paymentContent = (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Moyens de paiement</h3>
      <div className="space-y-2">
        <p>Nous acceptons les moyens de paiement suivants :</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Orange Money</li>
          <li>MTN Mobile Money</li>
          <li>Wave</li>
          <li>Moov Money</li>
          <li>Paiement à la livraison (Abidjan uniquement)</li>
        </ul>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'faq':
        return (
          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div key={index} className="border rounded-lg overflow-hidden">
                <button
                  className="w-full px-6 py-4 text-left bg-white hover:bg-gray-50 flex items-center justify-between font-medium"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  {faq.question}
                  <span className="transform transition-transform duration-200 text-xl">
                    {openFaq === index ? '−' : '+'}
                  </span>
                </button>
                {openFaq === index && (
                  <div className="px-6 py-4 bg-gray-50 text-gray-600 whitespace-pre-line">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        );
      case 'shipping':
        return shippingContent;
      case 'returns':
        return returnsContent;
      case 'payment':
        return paymentContent;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <Title text1="CENTRE" text2="D'AIDE" />
        <p className="text-gray-600 mt-4">
          Comment pouvons-nous vous aider aujourd'hui ?
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
        {helpSections.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`p-4 rounded-lg text-center transition-colors ${
              activeSection === section.id
                ? 'bg-orange-600 text-white'
                : 'bg-white hover:bg-orange-50'
            }`}
          >
            <div className="text-2xl mb-2">{section.icon}</div>
            <div className="font-medium">{section.title}</div>
          </button>
        ))}
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm">
        {renderContent()}
      </div>

      <div className="mt-12 text-center">
        <h3 className="text-xl font-semibold mb-4">Besoin de plus d'aide ?</h3>
        <p className="text-gray-600 mb-6">
          Notre équipe de support est disponible pour vous aider
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="tel:+2250707070707"
            className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
          >
            Appeler le +225 07 07 07 07 07
          </a>
          <a
            href="mailto:support@techmarket.ci"
            className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
          >
            Envoyer un email
          </a>
        </div>
      </div>
    </div>
  );
};

export default Help;