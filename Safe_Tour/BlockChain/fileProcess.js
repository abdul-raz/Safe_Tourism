const fs = require("fs");
const crypto = require("crypto");

// Convert Base64 key back to Buffer
function base64ToBuffer(base64Key) {
  return Buffer.from(base64Key, "base64");
}

// Hash the file content using SHA-256
function hashFile(fileBuffer) {
  const hash = crypto.createHash("sha256");
  hash.update(fileBuffer);
  return hash.digest("hex");
}

// Encrypt the file content using AES-GCM with symmetric key
function encryptFile(fileBuffer, base64SymKey) {
  const key = base64ToBuffer(base64SymKey);
  const iv = crypto.randomBytes(12);

  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
  const encrypted = Buffer.concat([cipher.update(fileBuffer), cipher.final()]);
  const authTag = cipher.getAuthTag();

  return {
    iv: iv.toString("base64"),
    authTag: authTag.toString("base64"),
    encryptedData: encrypted.toString("base64"),
  };
}

// Example usage: replace with your file path & symmetric key
const filePath = "./sample.pdf"; // Put your PDF, PNG, or any file here
const symmetricKey = "ZcrGmuAuL53Ir2ebOSAVuNdUfmLMKFGrTgKfuMK+38k="; // Your Base64 symmetric key

// Read file as buffer
fs.readFile(filePath, (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }

  const fileHash = hashFile(data);
  console.log("File SHA-256 Hash:", fileHash);

  const encryptedFile = encryptFile(data, symmetricKey);
  console.log("Encrypted File Data:", encryptedFile);
});
