const express = require("express");
const router = express.Router();
const { create, update, view } = require('../controllers/stocks');
const factory = require('../handlers/factory');

router.post("/", factory(create));
router.put("/:id", factory(update));
router.get("/:id", factory(view));

module.exports = router;
