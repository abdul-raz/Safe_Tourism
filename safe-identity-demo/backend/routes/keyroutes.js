const express = require("express");
const router = express.Router();
const { generateAllKeys } = require("../blockchainActivity/KeyGen");

router.get("/generate-keys", (req, res) => {
  try {
    const keys = generateAllKeys();
    res.json(keys); // { publicKey, privateKey, symmetricKey }
  } catch (error) {
    res.status(500).json({ error: "Failed to generate keys" });
  }
});

module.exports = router;
