const nacl = require("tweetnacl");
const util = require("tweetnacl-util");
const crypto = require("crypto");

// Asymmetric key generation
function generateAsymmetricKeyPair() {
  const keyPair = nacl.sign.keyPair();
  const publicKey = util.encodeBase64(keyPair.publicKey);
  const privateKey = util.encodeBase64(keyPair.secretKey);
  return { publicKey, privateKey };
}

// Symmetric key generation
function generateSymmetricKey() {
  const key = crypto.randomBytes(32);
  return key.toString("base64");
}

// Integration function
function generateAllKeys() {
  const asymmetricKeys = generateAsymmetricKeyPair();
  const symmetricKey = generateSymmetricKey();

  console.log("Asymmetric Public Key:", asymmetricKeys.publicKey);
  console.log("Asymmetric Private Key:", asymmetricKeys.privateKey);
  console.log("Symmetric Key (AES-GCM 256-bit):", symmetricKey);
}

// Run integration
generateAllKeys();
