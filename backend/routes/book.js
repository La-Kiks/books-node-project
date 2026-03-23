const express = require("express");
const router = express.Router();
const bookController = require("../controllers/book");
const auth = require("../middlewares/auth");
const multer = require("../middlewares/multer");
const sharpMiddleware = require("../middlewares/sharp");

router.get("/", bookController.getAllBooks);
router.get("/bestrating", bookController.getBestRatedBooks);
router.get("/:id", bookController.getOneBook);
router.post("/", auth, multer, sharpMiddleware, bookController.addBook);
router.put("/:id", auth, multer, sharpMiddleware, bookController.updateBook);
router.delete("/:id", auth, bookController.deleteBook);
router.post("/:id/rating", auth, bookController.rateBook);

module.exports = router;
