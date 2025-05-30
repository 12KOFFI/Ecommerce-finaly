import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

// function for add product
const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      brand,
      color,
      bestseller,
    } = req.body;

    console.log("Données reçues:", req.body);
    console.log("Fichiers reçus:", req.files);

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );

    console.log("Images à uploader:", images);

    //-------------------------------Upload des images dans Cloudinary---------------------
    let imageUrl = await Promise.all(
      images.map(async (item) => {
        try {
          console.log("Tentative d'upload de l'image:", item.path);
          let result = await cloudinary.uploader.upload(item.path, {
            resource_type: "image",
          });
          console.log("Upload réussi:", result.secure_url);
          return result.secure_url;
        } catch (error) {
          console.error("Erreur lors de l'upload sur Cloudinary:", error);
          throw error;
        }
      })
    );

    console.log("URLs des images uploadées:", imageUrl);

    const productData = {
      name,
      description,
      category,
      price: Number(price),
      subCategory,
      brand,
      color,
      bestseller: bestseller === "true",
      image: imageUrl,
      date: Date.now(),
    };

    console.log("Données du produit à sauvegarder:", productData);

    // Sauvegarde en base
    const product = new productModel(productData);
    await product.save();

    res.json({ success: true, message: "Product added successfully" });
  } catch (error) {
    console.error("Erreur complète:", error);
    res.json({ success: false, message: error.message });
  }
};

// les autres fonctions restent inchangées
const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, products });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Product removed successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await productModel.findById(productId);
    res.json({ success: true, product });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { listProducts, addProduct, removeProduct, singleProduct };
