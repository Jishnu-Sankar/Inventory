const Execute = require('../database/query');

module.exports = {
  createWareHouse: async (newWareHouse) => {
    return await Execute(`INSERT INTO warehouses SET ?`, newWareHouse);
  },
  listWareHouses: async () => {
    return await Execute(`SELECT * FROM warehouses`, null);
  },
  getWareHouseBy: async ({ houseID }) => {
    try {
      const result = await Execute(`SELECT * FROM warehouses WHERE id_warehouse = ?`, houseID);
      return result[0];
    } catch (error) {
      throw error;
    }
  },
  updateWareHouseAvailability: async ({ houseID, stock }) => {
    return await Execute(`UPDATE warehouses SET available_space = ? WHERE id_warehouse = ?`, [stock, houseID]);
  }
};
