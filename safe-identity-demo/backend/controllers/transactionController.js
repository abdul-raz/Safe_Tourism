const User = require("../models/user");
const { uploadJSONToPinata } = require("../pinataUpload");

// Store a blockchain transaction hash for a user
async function storeTransaction(req, res) {
  const { email, txHash } = req.body;
  if (!email || !txHash) {
    return res.status(400).json({ error: "Missing email or transaction hash" });
  }

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    let transactions = user.transactions || [];
    transactions.push(txHash);

    await user.update({ transactions });

    res.json({ message: "Transaction stored successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Upload encrypted file data to IPFS and store CID as transaction
async function uploadFile(req, res) {
  const { email, encryptedFileData } = req.body;
  if (!email || !encryptedFileData) {
    return res
      .status(400)
      .json({ error: "Missing email or encrypted file data" });
  }

  try {
    const ipfsHash = await uploadJSONToPinata(encryptedFileData);

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    let transactions = user.transactions || [];
    transactions.push(ipfsHash);

    await user.update({ transactions });

    res.json({ message: "File uploaded and IPFS hash stored", ipfsHash });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to upload file" });
  }
}

module.exports = {
  storeTransaction,
  uploadFile,
};
