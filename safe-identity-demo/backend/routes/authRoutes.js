const express = require("express");
const { register, login } = require("../controllers/authController");
const { updatePublicKey } = require("../controllers/userController");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/update-public-key", updatePublicKey);

module.exports = router;
