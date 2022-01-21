const wareHouseModel = require("../../models/wareHouses");

module.exports = async (req, res) => {
  const warehouses = await wareHouseModel.listWareHouses();
  return res.status(200).send({ message: 'warehouses list', data: warehouses });
};
