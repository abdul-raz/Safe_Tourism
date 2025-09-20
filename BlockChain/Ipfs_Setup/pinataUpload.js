const pinataSDK = require("@pinata/sdk");

// Initialize with your API keys
const pinata = pinataSDK(
  "7170a473adb5ec290020",
  "abd24d0f199354fb8c960b69ecd53232b6c552c688920551dc50c9477b8f93e7"
);

const encryptedFileData = {
  iv: "EM42W7LcoLSx20sc",
  authTag: "3r3hOhy/vSKzVomObFf7sg==",
  encryptedData: "prkyyPaXonU2huqI4RNhQmIJOGPQ...", // truncated for brevity
};

async function uploadToPinata(data) {
  try {
    const result = await pinata.pinJSONToIPFS(data);
    console.log("Pinata CID:", result.IpfsHash);
  } catch (error) {
    console.error("Error uploading to Pinata:", error);
  }
}

uploadToPinata(encryptedFileData);
