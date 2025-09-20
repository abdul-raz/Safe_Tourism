const nacl = require("tweetnacl");
const util = require("tweetnacl-util");

function generateKeyPair() {
  // Generate the key pair
  const keyPair = nacl.sign.keyPair();

  // Convert keys to Base64 strings for easy storage/transmission
  const publicKey = util.encodeBase64(keyPair.publicKey);
  const privateKey = util.encodeBase64(keyPair.secretKey);

  return { publicKey, privateKey };
}

// Run and print keys
const keys = generateKeyPair();
console.log("Public Key:", keys.publicKey);
console.log("Private Key:", keys.privateKey);
