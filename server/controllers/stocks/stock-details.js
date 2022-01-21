const stockModel = require("../../models/stocks");
const HttpException = require("../../handlers/HttpException");

module.exports = async (req, res) => {
  const stock = await stockModel.getStockBy({ stockID: req.params.id });
  if (!stock) {
    throw new HttpException(404, "Not found: stock not found");
  }

  return res.status(200).send({ message: 'Stock details', data: stock });
};
