const wareHouseModel = require("../../models/wareHouses");
const ProductModel = require("../../models/products");
const stockModel = require("../../models/stocks");
const HttpException = require("../../handlers/HttpException");

module.exports = async (req, res) => {
  if (!req.body || !req.body.id_warehouse || !req.body.id_product || !req.body.quantity) {
    throw new HttpException(400, "Bad request: empty fields list");
  }

  const {
    id_warehouse: houseID,
    id_product: productID,
    quantity: Quantity
  } = req.body;

  const warehouse = await wareHouseModel.getWareHouseBy({ houseID });
  if (!warehouse) {
    throw new HttpException(404, "Warehouse not found");
  }

  if (Quantity > warehouse.available_space) {
    throw new HttpException(400, "Warehouse is fully occuipied");
  }

  const product = await ProductModel.getProductBy({ productID });
  if (!product) {
    throw new HttpException(404, "Product not found");
  }

  const newStock = {
    id_warehouse: houseID,
    id_product: productID,
    stock_qty: Quantity
  };
  const response = await stockModel.createStock(newStock);
  await wareHouseModel.updateWareHouseAvailability({ houseID, stock: warehouse.available_space - Quantity });
  if (response) {
    return res.status(200).send({ message: "Stock has been added to the warehouse" });
  }

  throw new HttpException(500, "Stock creation failed");
};
