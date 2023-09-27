const path = require("path");
const multer = require("multer");
const MIMETYPES = ["application/pdf"];
const fs = require("fs");
const { scryptSync, createDecipheriv, createCipheriv } = require("crypto");

const hello = (req, res) => {
  res.render("index", {});
};

const upload = (req, res) => {
  console.log(req.file);
  res.send("Uploaded");
};

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

const Symetric_Encryption = (filePath, output, algorithm, key, iv) => {
  const fileStream = fs.ReadStream(filePath);
  const outputFileStream = fs.createWriteStream(output);

  const cipher = createCipheriv(algorithm, key, iv);
  let encrypted;

  fileStream.on("data", (data) => {
    encrypted = cipher.update(data);
    outputFileStream.write(encrypted);
  });

  fileStream.on("end", () => {
    outputFileStream.end();
  });
};

const password = '000'
const algorithm = 'aes-256-ctr'
let key = scryptSync(password, 'salt', 32)
let iv = Buffer.alloc(16, 0)

const Encryp_File = (req, res) => {
  const file = req.file;
  const filePath = file.path;
  const output = path.join(__dirname, "../static/public/downloads");
  Symetric_Encryption(filePath, output, algorithm, key, iv);
  res.send("Encrypted");
}

module.exports = { hello, upload, multerUpload };
