const { Router } = require("express");
const {
  hello,
  upload,
  multerUpload,
} = require("../controllers/index.controllers.js");
const path = require("path");
const multer = require("multer");

const MIMETYPES = ["application/pdf"];
const router = Router();

//ANCHOR - Multer Middleware Config

router.get("/", hello);
router.post("/upload", multerUpload.single("pdf"), upload);

module.exports = router;
