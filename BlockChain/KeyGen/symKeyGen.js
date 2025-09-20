const crypto = require("crypto");

function generateSymmetricKey() {
  // Generate a 256-bit (32 bytes) random symmetric key
  const key = crypto.randomBytes(32); // 32 bytes = 256 bits

  // Convert key to Base64 string to store or transmit easily
  return key.toString("base64");
}

// Run and print the symmetric key
const symKey = generateSymmetricKey();
console.log("Symmetric Key (AES-GCM 256-bit):", symKey);
