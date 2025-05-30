import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "vous devez vous connecter en tant que Admiin",
      });
    }

    const token_decode = jwt.verify(token, process.env.JWT_SECRET);

    // verification de l'email et du mot de passe de l'admin
    if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return res.status(401).json({
        success: false,
        message: "vous devez vous connecter en tant que Admiin",
      });
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

export default adminAuth;
