const express = require("express");
const router = express.Router();

const {
  createShort,
  redirectUrl,
  getAllUrls,
  deleteUrl,
  verifyPassword,
} = require("../controllers/urlController");

router.post("/shorten", createShort);
router.get("/analytics", getAllUrls);
router.delete("/delete/:id", deleteUrl);

// 🔐 verify route
router.post("/verify/:short", verifyPassword);

// ⚠️ keep last
router.get("/:short", redirectUrl);

module.exports = router;