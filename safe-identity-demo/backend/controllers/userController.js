const User = require("../models/user");

/**
 * Update user's public key
 * Expects JSON body: { userId: number, publicKey: string }
 */
async function updatePublicKey(req, res) {
  const { userId, publicKey } = req.body;

  if (!userId || !publicKey) {
    return res
      .status(400)
      .json({ error: "User ID and publicKey are required" });
  }

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.publicKey = publicKey;
    await user.save();

    res.json({ success: true, message: "Public key updated successfully" });
  } catch (error) {
    console.error("Error updating public key:", error);
    res.status(500).json({ error: "Failed to update public key" });
  }
}

module.exports = { updatePublicKey };
