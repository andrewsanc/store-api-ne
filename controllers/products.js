const Product = require("../models/products");

// Testing products functionality
const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({
    featured: true,
    name: "vase table",
  });

  res.status(200).json({ products, nbHits: products.length });
};

const getAllProducts = async (req, res) => {
  const { featured, company, name, sort } = req.query;
  const queryObject = {};

  if (featured) {
    queryObject.featured = featured;
  }

  if (company) {
    queryObject.company = company;
  }

  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }

  let result = Product.find(queryObject);

  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result.sort = result.sort("createdAt");
  }

  const products = await result;
  res.status(200).json({ products, hits: products.length });
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};
