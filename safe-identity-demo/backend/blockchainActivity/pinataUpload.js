const pinataSDK = require("@pinata/sdk");

// Initialize with your Pinata API keys
const pinata = pinataSDK(
  "7170a473adb5ec290020", // Pinata API key - replace with your own for production
  "abd24d0f199354fb8c960b69ecd53232b6c552c688920551dc50c9477b8f93e7" // Pinata Secret key
);

/**
 * Uploads JSON data (e.g., encrypted file data) to Pinata IPFS and returns the CID
 * @param {Object} data - JSON object containing the encrypted file data
 * @returns {Promise<string>} - The IPFS hash (CID)
 */
async function uploadToPinata(data) {
  try {
    const result = await pinata.pinJSONToIPFS(data);
    console.log("Pinata CID:", result.IpfsHash);
    return result.IpfsHash;
  } catch (error) {
    console.error("Error uploading to Pinata:", error);
    throw error;
  }
}

// Example encrypted file data to upload
const encryptedFileData = {
  iv: "EM42W7LcoLSx20sc",
  authTag: "3r3hOhy/vSKzVomObFf7sg==",
  encryptedData: "prkyyPaXonU2huqI4RNhQmIJOGPQ...", // truncated for brevity
};

// Run the upload (for example purpose)
uploadToPinata(encryptedFileData)
  .then((cid) => {
    console.log("Upload successful. IPFS CID:", cid);
  })
  .catch((err) => {
    console.error("Upload failed:", err);
  });

module.exports = { uploadToPinata };
