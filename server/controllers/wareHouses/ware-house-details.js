const wareHouseModel = require("../../models/wareHouses");
const stockModel = require('../../models/stocks');
const HttpException = require("../../handlers/HttpException");

module.exports = async (req, res) => {
  const warehouse = await wareHouseModel.getWareHouseBy({ houseID: req.params.id });
  if (!warehouse) {
    throw new HttpException(404, "Not found: warehouse not found");
  }

  const stocks = await stockModel.getHouseStocksBy({ houseID: req.params.id });
  return res.status(200).send({ message: 'warehouse details', data: { ...warehouse, stocks } });
};
