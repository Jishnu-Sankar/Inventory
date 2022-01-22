const stockModel = require("../../models/stocks");

module.exports = async (req, res) => {
  const stocks = await stockModel.getStockListBy();
  return res.status(200).send({ message: 'Stock lists', data: stocks });
};
