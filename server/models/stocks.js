const Execute = require('../database/query');

module.exports = {
  createStock: async (stockData) => {
    return await Execute(`INSERT INTO warehouse_stocks SET ?`, stockData);
  },
  getStockListBy: async ({ houseID, productID }) => {
    let condition = '';
    if (houseID && productID) {
      condition = ` WHERE id_warehouse = ${houseID} AND id_product = ${productID}`
    } else if (houseID) {
      condition = ` WHERE id_warehouse = ${houseID}`
    } else if (productID) {
      condition = ` WHERE id_product = ${productID}`
    }

    return await Execute(
      `SELECT * FROM warehouse_stocks inner join products using (id_product) inner join warehouses using(id_warehouse) ${condition}`
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
      `UPDATE warehouse_stocks SET id_warehouse = ?, id_product = ?, stock_qty = ? WHERE id_stock = ?`,
      [houseID, productID, Quantity, stockID]
    );
  },
  deleteStockByID: async ({ stockID }) => {
    return await Execute(
      `DELETE FROM warehouse_stocks  WHERE id_stock = ?`, [stockID]
    );
  }
};
