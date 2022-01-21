const express = require("express");
const router = express.Router();
const { create, list, view } = require('../controllers/products');
const factory = require('../handlers/factory');

router.post("/", factory(create));
router.get("/", factory(list));
router.get("/:id", factory(view));

module.exports = router;
