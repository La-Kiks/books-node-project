const express = require("express");
const router = express.Router();
const bookController = require("../controllers/book");
const auth = require("../middlewares/auth");
const multer = require("../middlewares/multer");

router.get("/", bookController.getAllBooks);
router.get("/:id", bookController.getOneBook);
router.post("/", auth, multer, bookController.addBook);
router.put("/:id", auth, multer, bookController.updateBook);
router.delete("/:id", auth, bookController.deleteBook);
router.post("/:id/rating", auth, bookController.rateBook);

module.exports = router;
