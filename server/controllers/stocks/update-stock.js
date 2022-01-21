const wareHouseModel = require("../../models/wareHouses");
const ProductModel = require("../../models/products");
const stockModel = require("../../models/stocks");
const HttpException = require("../../handlers/HttpException");

module.exports = async (req, res) => {
  if (!req.body || !req.body.id_product || !req.body.quantity) {
    throw new HttpException(400, "Bad request: empty fields list");
  }

  const stockID = req.params.id;
  const {
    id_product: productID,
    quantity: Quantity
  } = req.body;

  const stock = await stockModel.getStockBy({ stockID });
  if (!stock) {
    throw new HttpException(404, "Stock not found");
  }

  if (Quantity > stock.stock_qty) {
    throw new HttpException(400, "Cannot add more quantity of this product");
  }

  const warehouse = await wareHouseModel.getWareHouseBy({ houseID: stock.id_warehouse });
  if (!warehouse) {
    throw new HttpException(404, "Warehouse not found");
  }

  const product = await ProductModel.getProductBy({ productID });
  if (!product) {
    throw new HttpException(404, "Product not found");
  }

  const newStock = {
    houseID: stock.id_warehouse,
    productID,
    Quantity,
    stockID
  };
  const response = await stockModel.updateStockBy(newStock);
  await wareHouseModel.updateWareHouseAvailability({
    houseID: stock.id_warehouse,
    stock: warehouse.available_space + (stock.stock_qty - Quantity)
  });
  if (response) {
    return res.status(200).send({ message: "Unstocked product from Warehouse" });
  }

  throw new HttpException(500, "Unstock creation failed");
};
