const express = require("express");
const addTemplete = require("../controllers/Templete/addTemplete");
const getTemplete = require("../controllers/Templete/getTemplete");
const getTempleteData = require("../controllers/Templete/getTempleteData");
const handleUpload = require("../controllers/Templete/zipFile");

const router = express.Router();

router.get("/get/templetes", getTemplete);
router.get("/get/templetedata/:id", getTempleteData);
router.post("/add/templete", addTemplete);
router.post("/upload", handleUpload);

module.exports = router;
