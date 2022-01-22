const stockModel = require("../../models/stocks");

module.exports = async (req, res) => {
  const stocks = await stockModel.getStockListBy({
    houseID: req.query.id_warehouse,
    productID: req.query.id_product
  });

  return res.status(200).send({ message: 'Stock lists', data: stocks });
};
