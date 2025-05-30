# E-Commerce Application

Une application e-commerce complète avec un backend Node.js/Express et un frontend React, offrant une expérience d'achat fluide et sécurisée.

## 🌟 Fonctionnalités

### Pour les Clients
- 🛍️ Navigation des produits avec recherche et filtrage
- 🛒 Gestion du panier d'achat
- 📝 Processus de commande complet
- 👤 Authentification utilisateur
- 📦 Suivi des commandes

### Pour les Administrateurs
- ✨ Gestion des produits (CRUD)
- 📊 Tableau de bord administrateur
- 🔄 Gestion des commandes
- 👥 Gestion des utilisateurs

## 🏗️ Architecture

### Backend (Node.js/Express)
```
backend/
├── controllers/
│   ├── authController.js    # Gestion de l'authentification
│   ├── productController.js # Gestion des produits
│   └── orderController.js   # Gestion des commandes
├── models/
│   ├── userModel.js        # Schéma utilisateur
│   ├── productModel.js     # Schéma produit
│   └── orderModel.js       # Schéma commande
├── middleware/
│   ├── auth.js            # Middleware d'authentification
│   ├── userAuth.js        # Auth utilisateur
│   └── adminAuth.js       # Auth administrateur
└── routes/
    ├── authRoutes.js      # Routes d'authentification
    ├── productRoutes.js   # Routes des produits
    └── orderRoutes.js     # Routes des commandes
```

### Frontend (React)
```
frontend/
├── src/
│   ├── components/        # Composants réutilisables
│   ├── pages/            # Pages de l'application
│   ├── context/          # Contextes React
│   ├── assets/           # Ressources statiques
│   └── config/           # Configuration
```

## 🔄 Flux de Commande

1. **Ajout au Panier**
   - Sélection des produits
   - Gestion des quantités
   - Calcul du total

2. **Processus de Commande**
   - Vérification de l'authentification
   - Saisie des informations de livraison
   - Choix du mode de paiement
   - Validation de la commande

3. **Traitement de la Commande**
   - Création de la commande dans la base de données
   - Envoi de confirmation
   - Redirection vers la page des commandes
   - Vidage du panier

## 🛠️ Installation

1. **Cloner le projet**
```bash
git clone [URL_DU_REPO]
```

2. **Backend Setup**
```bash
cd backend
npm install
```

3. **Frontend Setup**
```bash
cd frontend
npm install
```

4. **Variables d'Environnement**
Créer un fichier `.env` dans le dossier backend :
```env
PORT=5000
MONGODB_URI=votre_uri_mongodb
JWT_SECRET=votre_secret_jwt
```

Créer un fichier `.env` dans le dossier frontend :
```env
VITE_BACKEND_URL=http://localhost:5000
```

## 🚀 Démarrage

1. **Lancer le Backend**
```bash
cd backend
npm start
```

2. **Lancer le Frontend**
```bash
cd frontend
npm run dev
```

## 🔐 Authentification

L'application utilise JWT (JSON Web Tokens) pour l'authentification :
- Les tokens sont stockés dans le localStorage
- Middleware d'authentification pour les routes protégées
- Différents niveaux d'accès (utilisateur/admin)

## 💳 Gestion des Paiements

Plusieurs options de paiement disponibles :
- Paiement à la livraison (COD)
- Stripe (intégration prévue)
- RazorPay (intégration prévue)

## 📦 Modèles de Données

### Utilisateur
```javascript
{
  name: String,
  email: String,
  password: String,
  role: String,
  // ...
}
```

### Produit
```javascript
{
  name: String,
  description: String,
  price: Number,
  image: [String],
  category: String,
  // ...
}
```

### Commande
```javascript
{
  userId: ObjectId,
  items: [{
    productId: ObjectId,
    quantity: Number,
    price: Number
  }],
  totalAmount: Number,
  shippingAddress: String,
  status: String,
  // ...
}
```

## 🔜 Prochaines Étapes

- [ ] Intégration des paiements en ligne
- [ ] Système de notation des produits
- [ ] Gestion des retours
- [ ] Notifications en temps réel
- [ ] Interface administrateur améliorée

## 👥 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
1. Fork le projet
2. Créer une branche pour votre fonctionnalité
3. Commiter vos changements
4. Pousser vers la branche
5. Ouvrir une Pull Request

## 📝 License

MIT License - voir le fichier LICENSE pour plus de détails. 