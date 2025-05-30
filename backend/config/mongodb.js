import Mongoose from "mongoose";
const connectDB = async () => {
  Mongoose.connection.on("connected", () => {   // evenement servant a ecouter la connexion en cas de reussite
    console.log("DB Connected");
  });

  await Mongoose.connect(`${process.env.MONGODB_URI} `);   //connexion
};

export default connectDB;
