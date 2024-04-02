const express = require("express");
const addTemplete = require("../controllers/Templete/addTemplete");
const getTemplete = require("../controllers/Templete/getTemplete");
const getTempleteData = require("../controllers/Templete/getTempleteData");
const uploadCsv = require("../controllers/Templete/uploadCsv");
const multer = require("multer");

const router = express.Router();

router.get("/get/templete", getTemplete);
router.post("/add/templete", addTemplete);
router.get("/get/templetedata/:id", getTempleteData);
router.post("/upload/csv", uploadCsv);

module.exports = router;
