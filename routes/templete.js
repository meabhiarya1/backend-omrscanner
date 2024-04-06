const express = require("express");
const addTemplete = require("../controllers/Templete/addTemplete");
const getTemplete = require("../controllers/Templete/getTemplete");
const getTempleteData = require("../controllers/Templete/getTempleteData");
const handleUpload = require("../controllers/Templete/upload");
const getHeaderData = require("../controllers/Templete/getHeaderData");
const handleData = require("../controllers/Templete/handleData");
const getCsvData = require("../controllers/Templete/getCsvData");

const router = express.Router();

router.get("/get/templetes", getTemplete);
router.get("/get/templetedata/:id", getTempleteData);
router.get("/get/headerdata/:id", getHeaderData);
router.get("/get/csvdata/:id", getCsvData);

router.post("/add/templete", addTemplete);
router.post("/upload/:id", handleUpload);
router.post("/data/:id", handleData);

module.exports = router;
