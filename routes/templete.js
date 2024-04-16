const express = require("express");
const addTemplete = require("../controllers/Templete/addTemplete");
const getTemplete = require("../controllers/Templete/getTemplete");
const getTempleteData = require("../controllers/Templete/getTempleteData");
const handleUpload = require("../controllers/Templete/upload");
const getHeaderData = require("../controllers/Templete/getHeaderData");
const handleData = require("../controllers/Templete/handleData");
const getCsvData = require("../controllers/Templete/getCsvData");
const getImage = require("../controllers/Templete/getImage");
const updateCsvData = require("../controllers/Templete/updateCsvData")

const router = express.Router();

router.get("/get/templetes", getTemplete);
router.get("/get/templetedata/:id", getTempleteData); //templeteId
router.get("/get/headerdata/:id", getHeaderData); //templeteId
router.get("/get/csvdata/:id", getCsvData); // fileId

router.post("/get/image", getImage);
router.post("/add/templete", addTemplete);
router.post("/upload/:id", handleUpload); //templeteId
router.post("/data", handleData);
router.post("/updatecsvdata/:id", updateCsvData); // fileId

module.exports = router;
