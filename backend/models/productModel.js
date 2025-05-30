import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: [String], required: true },      // tableau de strings pour les URLs
  category: { type: String, required: true },
  subCategory: { type: String, required: true },
  brand: { type: String, required: false },       // ajout de brand (optionnel)
  color: { type: String, required: false },       // ajout de color (optionnel)
  bestseller: { type: Boolean, default: false },
  date: { type: Number, required: true },
});

const productModel = mongoose.models.product || mongoose.model("product", productSchema);

export default productModel;
