require("dotenv").config();

const connectDB = require("./db/connect");
const Product = require("./models/products");

const jsonProducts = require("./products.json");

const startPopulatingDB = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Product.deleteMany();
    await Product.create(jsonProducts);
    console.log("Successfully populated DB");
  } catch (err) {
    console.log(err);
  }
};

startPopulatingDB();
