const ProductModel = require("../../models/products");
const HttpException = require("../../handlers/HttpException");

module.exports = async (req, res) => {
  const product = await ProductModel.getProductBy({ productID: req.params.id });
  if (!product) {
    throw new HttpException(404, "Not found: product not found");
  }

  return res.status(200).send({ message: 'Product details', data: product });
};
