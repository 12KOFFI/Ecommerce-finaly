import React, { useState } from 'react';
import Title from '../components/Title';

const Help = () => {
  const [activeSection, setActiveSection] = useState('faq');
  const [openFaq, setOpenFaq] = useState(null);

  const faqData = [
    {
      question: "Comment passer une commande ?",
      answer: "Pour passer une commande, parcourez notre catalogue, ajoutez les articles souhaités à votre panier, puis suivez le processus de paiement. Vous devrez vous connecter ou créer un compte pour finaliser votre commande."
    },
    {
      question: "Quels sont les délais de livraison ?",
      answer: "Les délais de livraison varient généralement entre 3 à 5 jours ouvrables pour les livraisons standard. Pour les livraisons express, comptez 1 à 2 jours ouvrables."
    },
    {
      question: "Comment suivre ma commande ?",
      answer: "Une fois votre commande expédiée, vous recevrez un email avec un numéro de suivi. Vous pouvez également suivre votre commande dans la section 'Mes Commandes' de votre compte."
    },
    {
      question: "Quelle est la politique de retour ?",
      answer: "Nous acceptons les retours dans les 30 jours suivant la réception de votre commande. Les articles doivent être dans leur état d'origine, non utilisés et dans leur emballage d'origine."
    },
    {
      question: "Comment contacter le service client ?",
      answer: "Vous pouvez nous contacter par email à support@example.com ou par téléphone au +XX XXX XXX XXX du lundi au vendredi, de 9h à 18h."
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
          <li>Livraison Standard (3-5 jours ouvrables) : Gratuite à partir de 50€</li>
          <li>Livraison Express (1-2 jours ouvrables) : 9.99€</li>
          <li>Click & Collect : Gratuit</li>
        </ul>
      </div>
      <p>Toutes les commandes sont traitées sous 24h (jours ouvrables).</p>
    </div>
  );

  const returnsContent = (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Politique de retour</h3>
      <div className="space-y-2">
        <p>Notre politique de retour est simple et flexible :</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>30 jours pour retourner votre article</li>
          <li>Article non utilisé et dans son emballage d'origine</li>
          <li>Étiquette de retour gratuite</li>
          <li>Remboursement sous 5 jours ouvrés</li>
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
          <li>Cartes bancaires (Visa, Mastercard, American Express)</li>
          <li>PayPal</li>
          <li>Apple Pay</li>
          <li>Google Pay</li>
          <li>Paiement en 3x sans frais (à partir de 100€)</li>
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
                  <div className="px-6 py-4 bg-gray-50 text-gray-600">
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
        <div className="flex justify-center gap-4">
          <a
            href="mailto:support@example.com"
            className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
          >
            Nous contacter
          </a>
        </div>
      </div>
    </div>
  );
};

export default Help;