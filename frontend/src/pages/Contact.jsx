import React, { useState } from 'react';
import Title from '../components/Title';
import { toast } from 'react-toastify';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Message envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.");
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  const contactInfo = [
    {
      icon: "📞",
      title: "Téléphone",
      content: "+XX XXX XXX XXX",
      detail: "Lun-Ven, 9h-18h"
    },
    {
      icon: "📧",
      title: "Email",
      content: "support@example.com",
      detail: "Réponse sous 24h"
    },
    {
      icon: "📍",
      title: "Adresse",
      content: "123 Rue du Commerce",
      detail: "75001 Paris, France"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      {/* Hero Section */}
      <div className="relative h-[300px] rounded-2xl overflow-hidden mb-16">
        <img
          src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80"
          alt="Contact us"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
          <div className="p-8 text-white">
            <h1 className="text-4xl font-bold mb-4">Contactez-nous</h1>
            <p className="text-lg max-w-2xl">
              Notre équipe est là pour vous aider et répondre à toutes vos questions
            </p>
          </div>
        </div>
      </div>

      <div className="text-center mb-12">
        <Title text1="NOUS" text2="CONTACTER" />
        <p className="text-gray-600 mt-4">
          Une question ? Un problème ? N'hésitez pas à nous contacter
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        {contactInfo.map((info, index) => (
          <div key={index} className="bg-gradient-to-b from-orange-50 to-white p-8 rounded-xl shadow-sm text-center transform hover:scale-105 transition-transform duration-300">
            <div className="text-5xl mb-6">{info.icon}</div>
            <h3 className="text-xl font-semibold mb-3">{info.title}</h3>
            <p className="text-gray-800 mb-2 text-lg">{info.content}</p>
            <p className="text-gray-600">{info.detail}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-semibold mb-6">Envoyez-nous un message</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Nom complet
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
                placeholder="Votre nom"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
                placeholder="votre@email.com"
              />
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                Sujet
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
                placeholder="Le sujet de votre message"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
                placeholder="Votre message..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-orange-600 text-white py-3 px-6 rounded-lg hover:bg-orange-700 transition-colors duration-300 font-medium"
            >
              Envoyer le message
            </button>
          </form>
        </div>

        <div className="space-y-8">
          <div className="bg-gradient-to-br from-orange-50 to-white rounded-xl p-8 shadow-sm">
            <h3 className="text-xl font-semibold mb-6">FAQ Rapide</h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-medium mb-2 text-orange-700">Quel est le délai de livraison ?</h4>
                <p className="text-gray-600">
                  La livraison standard prend 3-5 jours ouvrables. La livraison express est disponible sous 24-48h.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2 text-orange-700">Comment retourner un produit ?</h4>
                <p className="text-gray-600">
                  Vous avez 30 jours pour retourner un produit. Rendez-vous dans votre espace client pour initier un retour.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2 text-orange-700">Les produits sont-ils garantis ?</h4>
                <p className="text-gray-600">
                  Tous nos produits sont garantis conformément à la garantie constructeur, généralement 2 ans.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl overflow-hidden shadow-sm">
            <img
              src="https://images.unsplash.com/photo-1534536281715-e28d76689b4d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt="Service client"
              className="w-full h-[300px] object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
