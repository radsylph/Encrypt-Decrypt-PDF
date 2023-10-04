const crypto = require("crypto");
const fs = require("fs");

function encryptText(plainText) {
  return crypto.publicEncrypt(
    {
      key: fs.readFileSync("public_key.pem", "utf8"),
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: "sha256",
    },

    Buffer.from(plainText)
  );
}

function decryptText(encryptedText) {
  return crypto.privateDecrypt(
    {
      key: fs.readFileSync("private_key.pem", "utf8"),
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: "sha256",
    },
    encryptedText
  );
}

module.exports = { encryptText, decryptText };
