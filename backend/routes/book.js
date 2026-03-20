const express = require("express");
const router = express.Router();
const bookController = require("../controllers/book");
const auth = require("../middlewares/auth");
const multer = require("../middlewares/multer");

router.get("/", bookController.getAllBooks);
router.post("/", auth, multer, bookController.addBook);

module.exports = router;
