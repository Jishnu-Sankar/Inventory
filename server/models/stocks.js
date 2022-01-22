const Execute = require('../database/query');

module.exports = {
  createStock: async (stockData) => {
    return await Execute(`INSERT INTO warehouse_stocks SET ?`, stockData);
  },
  getStockListBy: async () => {
    return await Execute(
      `SELECT * FROM warehouse_stocks inner join products using (id_product) inner join warehouses using(id_warehouse)`,
    );
  },
  getStockBy: async ({ stockID }) => {
    const result = await Execute(
      `SELECT * FROM warehouse_stocks inner join products using (id_product) inner join warehouses using(id_warehouse) WHERE id_stock = ?`,
      stockID
    );

    return result[0]
  },
  getHouseStocksBy: async ({ houseID }) => {
    return await Execute(
      `SELECT * FROM warehouse_stocks inner join products using (id_product) WHERE id_warehouse = ?`,
      houseID
    );
  },
  updateStockBy: async ({ houseID, productID, Quantity, stockID }) => {
    return await Execute(
      `UPDATE warehouse_stocks SET id_warehouse = ?, id_product = ?, stock_qty = ? WHERE id_stock`,
      [houseID, productID, Quantity, stockID]
    );
  }
};
