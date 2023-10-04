const fs = require("fs");
const { scryptSync, createDecipheriv, createCipheriv } = require("crypto");
const crypto = require("crypto");

const encrypt = (filePath, output, algorithm, key, iv) => {
  const fileStream = fs.ReadStream(filePath);
  const outputStream = fs.createWriteStream(output);
  let encrypted;
  const cipher = createCipheriv(algorithm, key, iv);
  fileStream.on("data", (chunk) => {
    encrypted = cipher.update(chunk);
    outputStream.write(encrypted);
  });

  fileStream.on("end", () => {
    outputStream.end();
  });
};

const password = "000";
const algorithm = "aes-192-cbc";
let key = scryptSync(password, "salt", 24);
let iv = Buffer.alloc(16, 0);

const decypher = (inputFilePath, outputFilePath, algorithm, key, iv) => {
  const outputWriteStream = fs.createWriteStream(outputFilePath);
  const inputReadStream = fs.ReadStream(inputFilePath);

  const decipher = createDecipheriv(algorithm, key, iv);
  let decrypted;
  inputReadStream.on("data", (chunk) => {
    decrypted = decipher.update(chunk);
    outputWriteStream.write(decrypted);
  });

  inputReadStream.on("end", () => {
    outputWriteStream.end();
  });
};

// const publicKey = "./public_key.pem";
// const privateKey = "./private_key.pem";

// const asymmetricEncrypt = (filePath, publicKey, outputEncryptedPath) => {
//   const fileData = fs.readFileSync(filePath);

//   const encryptedData = crypto.publicEncrypt(publicKey, fileData);

//   fs.writeFileSync(outputEncryptedPath, encryptedData);
// };

// const asymmetricDecrypt = (
//   encryptedFilePath,
//   privateKey,
//   outputDecryptedPath
// ) => {
//   const encryptedData = fs.readFileSync(encryptedFilePath);

//   const decryptedData = crypto.privateDecrypt(privateKey, encryptedData);

//   fs.writeFileSync(outputDecryptedPath, decryptedData);
// };

// asymmetricEncrypt('C:\\Users\\Usuario\\Desktop\\Encrypt-Decrypt-PDF\\src\\andres.pdf', publicKey, "./encrypted_file.enc");

const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
  modulusLength: 2048, // Adjust key size as needed for security
  publicKeyEncoding: {
    type: "spki",
    format: "pem",
  },
  privateKeyEncoding: {
    type: "pkcs8",
    format: "pem",
  },
});

// Function to encrypt a file using hybrid encryption
const hybridEncrypt = (filePath, publicKey, outputEncryptedPath) => {
  // Generate a random symmetric encryption key
  const symmetricKey = crypto.randomBytes(32); // Adjust key size as needed

  // Encrypt the file using the symmetric key (e.g., AES encryption)
  const fileData = fs.readFileSync(filePath);
  const cipher = crypto.createCipher("aes-256-cbc", symmetricKey);
  const encryptedData = Buffer.concat([
    cipher.update(fileData),
    cipher.final(),
  ]);

  // Encrypt the symmetric key using the recipient's public key
  const encryptedSymmetricKey = crypto.publicEncrypt(publicKey, symmetricKey);

  // Combine the encrypted symmetric key and the encrypted file data
  const encryptedResult = Buffer.concat([encryptedSymmetricKey, encryptedData]);

  fs.writeFileSync(outputEncryptedPath, encryptedResult);
};

// Function to decrypt a file using hybrid decryption
const hybridDecrypt = (encryptedFilePath, privateKey, outputDecryptedPath) => {
  const encryptedData = fs.readFileSync(encryptedFilePath);

  // Extract the encrypted symmetric key and the encrypted file data
  const encryptedSymmetricKey = encryptedData.slice(0, 256);
  const encryptedFileData = encryptedData.slice(256);

  // Decrypt the symmetric key using the private key
  const symmetricKey = crypto.privateDecrypt(privateKey, encryptedSymmetricKey);

  // Decrypt the file data using the symmetric key (e.g., AES decryption)
  const decipher = crypto.createDecipher("aes-256-cbc", symmetricKey);
  const decryptedData = Buffer.concat([
    decipher.update(encryptedFileData),
    decipher.final(),
  ]);

  fs.writeFileSync(outputDecryptedPath, decryptedData);
};

// hybridEncrypt(
//   "C:\\Users\\Usuario\\Desktop\\Encrypt-Decrypt-PDF\\src\\andres.pdf",
//   publicKey,
//   "C:\\Users\\Usuario\\Desktop\\Encrypt-Decrypt-PDF\\src\\test.enc"
// );

// hybridDecrypt(
//   "C:\\Users\\Usuario\\Desktop\\Encrypt-Decrypt-PDF\\src\\test.enc",
//   privateKey,
//   "C:\\Users\\Usuario\\Desktop\\Encrypt-Decrypt-PDF\\src\\newtest.pdf"
// );

// encrypt(
//   "C:\\Users\\Usuario\\Desktop\\Encrypt-Decrypt-PDF\\src\\andres.pdf",
//   "C:\\Users\\Usuario\\Desktop\\Encrypt-Decrypt-PDF\\src\\test.enc",
//   algorithm,
//   key,
//   iv
// );


module.exports = { encrypt, decypher };
