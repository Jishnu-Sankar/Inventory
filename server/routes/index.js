const express = require('express');
const router = express.Router();

const products = require('./products');
const warehouses = require('./warehouses');
const stocks = require('./stocks');

router.get('/', (req, res) => {
  console.log(`Welcome to server`);
});

router.use("/products", products);
router.use("/warehouses", warehouses);
router.use("/stocks", stocks);


module.exports = router;
