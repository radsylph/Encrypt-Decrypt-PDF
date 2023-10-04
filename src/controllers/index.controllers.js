const { encrypt, decypher  } = require("../encrypt.js");
const { scryptSync, createDecipheriv, createCipheriv } = require("crypto");
const path = require("path");
const multer = require("multer");
const hello = (req, res) => {
  res.render("index", {});
};

const upload = (req, res) => {
  const password = "000";
  const algorithm = "aes-192-cbc";
  let key = scryptSync(password, "salt", 24);
  let iv = Buffer.alloc(16, 0);
  const { filename, originalname, path } = req.file;
  console.log(path, filename, originalname);
  decypher(
    path,
    path.replace(filename, "new" + filename + ".pdf"),
    algorithm,
    key,
    iv
  );

  res.send("Uploaded");
};

const multerUpload = multer({
  storage: multer.diskStorage({
    destination: path.join(__dirname, "../static/public/uploads"),
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  }),
});

module.exports = { hello, upload, multerUpload };
