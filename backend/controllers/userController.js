import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";

// creation de token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// Route for  user login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Chercher l'utilisateur par email
    const user = await userModel.findOne({ email });

    // 2. Si utilisateur n'existe pas → erreur
    if (!user) {
      return res.json({
        success: false,
        message: "L'utilisateur n'existe pas! Crée un compte.",
      });
    }

    // 3. Comparer le mot de passe envoyé avec le mot de passe hashé en base
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      // 4. Si mot de passe correct → créer token et envoyer succès
      const token = createToken(user._id);
      res.json({ success: true, token });
    } else {
      // 5. Sinon mot de passe incorrect → envoyer erreur
      res.json({ success: false, message: "Email ou mot de passe invalide" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//ROUTE for register
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // checking user alredy exists or not
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({
        success: false,
        message: "l'utilisateur exists deja!",
      });
    }

    // validating email format & strong password verifier si l'email est valide ou pas

    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "please entre une email valide",
      });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "please entre un mot de pass fort plus de 8 caracter",
      });
    }

    // hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);

    //  création d'un nouvel utilisateur
    const newUser = new userModel({
      name,
      email,
      password: hashedpassword,
    });

    const user = await newUser.save();

    const token = createToken(user._id);

    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//ROUTE for  Admin login
const adminlogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      return res.json({
        success: false,
        message: "Email ou mot de passe invalide",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Get user profile
const getUserProfile = async (req, res) => {
  try {
    const user = await userModel.findById(req.userId).select('-password -cartData');
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Utilisateur non trouvé"
      });
    }
    res.json({
      success: true,
      user
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération du profil"
    });
  }
};

// Update user profile
const updateUserProfile = async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;
    
    // Vérifier si l'email est déjà utilisé par un autre utilisateur
    if (email) {
      const existingUser = await userModel.findOne({ email, _id: { $ne: req.userId } });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "Cet email est déjà utilisé"
        });
      }
    }

    const updatedUser = await userModel.findByIdAndUpdate(
      req.userId,
      {
        name,
        email,
        phone,
        address
      },
      { new: true }
    ).select('-password -cartData');

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "Utilisateur non trouvé"
      });
    }

    res.json({
      success: true,
      user: updatedUser
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Erreur lors de la mise à jour du profil"
    });
  }
};

export { loginUser, registerUser, adminlogin, getUserProfile, updateUserProfile };
