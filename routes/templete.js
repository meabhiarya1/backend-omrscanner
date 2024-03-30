const express = require("express");
const templeteController = require("../controllers/templete");
const router = express.Router();

router.post("/addtemplete", templeteController.addTemplete);

module.exports = router;
