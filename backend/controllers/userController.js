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

    //  création d’un nouvel utilisateur
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

export { loginUser, registerUser, adminlogin };
