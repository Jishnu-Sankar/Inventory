const ProductModel = require("../../models/products");

module.exports = async (req, res) => {
  const products = await ProductModel.listProducts();
  return res.status(200).send({ message: 'products list', data: products });
};
