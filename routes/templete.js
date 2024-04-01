const express = require("express");
const addTemplete = require("../controllers/Templete/addTemplete");
const getTemplete = require("../controllers/Templete/getTemplete");
const getTempleteData = require("../controllers/Templete/getTempleteData");

const router = express.Router();

router.get("/get/templete", getTemplete);
router.post("/add/templete", addTemplete);
router.get("/get/templetedata/:id", getTempleteData);

module.exports = router;
