const wareHouseModel = require("../../models/wareHouses");
const HttpException = require("../../handlers/HttpException");

module.exports = async (req, res) => {
  if (!req.body || !req.body.warehouse_name) {
    throw new HttpException(400, "Bad request: empty fields list");
  }

  const newWareHouse = {
    warehouse_name: req.body.warehouse_name,
    stock_limit: req.body.stock_limit || 0,
    available_space: req.body.stock_limit || 0
  };
  const response = await wareHouseModel.createWareHouse(newWareHouse);
  if (response) {
    return res.status(200).send({ message: "New warehouse created" });
  }

  throw new HttpException(500, "Warehouse creation failed");
};
