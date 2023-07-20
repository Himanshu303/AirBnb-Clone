const express = require("express");
const { uploadByLink, upload } = require("../controllers/photo");
const router = express.Router();

const multer = require("multer");

const photosMiddleWare = multer({ dest: "uploads" });

router.post("/upload", photosMiddleWare.array("photos", 100), upload);
router.post("/upload-by-link", uploadByLink);

module.exports = router;
