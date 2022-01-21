const ProductModel = require("../../models/products");
const HttpException = require("../../handlers/HttpException");

module.exports = async (req, res) => {
  if (!req.body || !req.body.product_name) {
    throw new HttpException(400, "Bad request: empty fields list");
  }

  const newProduct = {
    product_name: req.body.product_name,
    price: req.body.price || 0,
  };
  const response = await ProductModel.createProduct(newProduct);
  if (response) {
    return res.status(200).send({ message: "New product created" });
  }

  throw new HttpException(500, "Product creation failed");
};
