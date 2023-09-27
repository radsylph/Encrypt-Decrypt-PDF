const { Router } = require("express");
const {
  hello,
  upload,
  multerUpload,
} = require("../controllers/index.controllers.js");

const router = Router();

//ANCHOR - Multer Middleware Config

router.get("/", hello);
router.post("/upload", multerUpload, upload);

module.exports = router;
