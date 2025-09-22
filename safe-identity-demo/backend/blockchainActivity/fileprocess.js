const fs = require("fs");
const crypto = require("crypto");

function base64ToBuffer(base64Key) {
  return Buffer.from(base64Key, "base64");
}

function hashFile(fileBuffer) {
  const hash = crypto.createHash("sha256");
  hash.update(fileBuffer);
  return hash.digest("hex");
}

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

/**
 * Processes the file buffer (hash and encrypt)
 * @param {Buffer} fileBuffer
 * @param {string} base64SymKey
 * @returns {Object} { hash, iv, authTag, encryptedData }
 */
function processBuffer(fileBuffer, base64SymKey) {
  const hash = hashFile(fileBuffer);
  const encrypted = encryptFile(fileBuffer, base64SymKey);
  return { hash, ...encrypted };
}

module.exports = { processBuffer };
