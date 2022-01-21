const Execute = require('../database/query');

module.exports = {
  createProduct: async (newProduct) => {
    return await Execute(`INSERT INTO products SET ?`, newProduct);
  },
  listProducts: async () => {
    return await Execute(`SELECT * FROM products`, null);
  },
  getProductBy: async ({ productID }) => {
    try {
      const result = await Execute(`SELECT * FROM products WHERE id_product = ?`, productID);
      return result[0];
    } catch (error) {
      throw error;
    }
  }
};
