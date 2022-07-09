const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const { uploadImages } = require("../controllers/filesController");

/**
 * update one entry
 */
router.post("/foodle/:id", authMiddleware, uploadImages);

module.exports = router;
