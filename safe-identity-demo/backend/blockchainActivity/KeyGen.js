const nacl = require("tweetnacl");
const util = require("tweetnacl-util");
const crypto = require("crypto");

// Generate asymmetric signing keypair (ed25519)
function generateAsymmetricKeyPair() {
  const keyPair = nacl.sign.keyPair();
  return {
    publicKey: util.encodeBase64(keyPair.publicKey),
    privateKey: util.encodeBase64(keyPair.secretKey),
  };
}

// Generate random symmetric AES-256-GCM key
function generateSymmetricKey() {
  const key = crypto.randomBytes(32);
  return key.toString("base64");
}

// Generate and return all keys
function generateAllKeys() {
  const asymmetricKeys = generateAsymmetricKeyPair();
  const symmetricKey = generateSymmetricKey();

  return {
    publicKey: asymmetricKeys.publicKey,
    privateKey: asymmetricKeys.privateKey,
    symmetricKey: symmetricKey,
  };
}

// If run directly, output generated keys
if (require.main === module) {
  const keys = generateAllKeys();
  console.log("Public Key:", keys.publicKey);
  console.log("Private Key:", keys.privateKey);
  console.log("Symmetric Key:", keys.symmetricKey);
}

module.exports = {
  generateAllKeys,
};
