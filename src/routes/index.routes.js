const { Router } = require("express");
const { hello, upload } = require("../controllers/index.controllers.js");
const path = require("path");
const multer = require("multer");

const MIMETYPES = ["application/pdf"];
const router = Router();

//ANCHOR - Multer Middleware Config
const multerUpload = multer({
  storage: multer.diskStorage({
    destination: path.join(__dirname, "../static/public/uploads"),
    filename: (req, file, cb) => {
      /* NOTE - This store unique versions of the files by changing their name
            const fileExtension = path.extname(file.originalname);
            const filename = file.originalname.split(fileExtension)[0];
            cb(null, `${filename} - ${Date.now()}${fileExtension}`);
        */
      cb(null, file.originalname);
    },
  }),
  fileFilter: (req, file, cb) => {
    if (MIMETYPES.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(`Only ${MIMETYPES.join(" ")} are allowed`));
    }
  },
}).single("pdf");

router.get("/", hello);
router.post("/upload", multerUpload, upload);

module.exports = router;
