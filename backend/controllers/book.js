const Book = require("../models/book");
const fs = require("fs");
const path = require("path");

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getOneBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.status(200).json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addBook = async (req, res) => {
  try {
    const bookData = JSON.parse(req.body.book);
    const { userId, title, author, year, genre, ratings } = bookData;

    const book = new Book({
      userId,
      title,
      author,
      year: parseInt(year),
      genre,
      imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
      ratings: ratings ?? [],
      averageRating: ratings?.[0]?.grade ?? 0,
    });

    await book.save();
    res.status(201).json({ message: "Book added successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const bookData = req.file ? JSON.parse(req.body.book) : req.body;

    const updatedData = {
      ...bookData,
      ...(req.file && {
        imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
      }),
    };

    if (req.file) {
      const book = await Book.findById(req.params.id);
      if (book?.imageUrl) {
        const filename = book.imageUrl.split("/images/")[1];
        fs.unlink(path.join(__dirname, "../images", filename), (err) => {
          if (err) console.error("Could not delete old image", err);
        });
      }
    }

    const book = await Book.findByIdAndUpdate(
      req.params.id,
      { ...updatedData },
      { new: true },
    );
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.status(200).json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    if (book.userId !== req.auth.userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const filename = book.imageUrl.split("/images/")[1];
    fs.unlink(path.join(__dirname, "../images", filename), (err) => {
      if (err) console.error("Could not delete image", err);
    });

    await Book.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.rateBook = async (req, res) => {
  try {
    const { userId, rating } = req.body;
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    const alreadyRated = book.ratings.find((r) => r.userId === userId);
    if (alreadyRated) {
      return res
        .status(400)
        .json({ message: "You have already rated this book" });
    }

    book.ratings.push({ userId, grade: rating });

    const average =
      book.ratings.reduce((sum, r) => sum + r.grade, 0) / book.ratings.length;
    book.averageRating = Math.round(average * 10) / 10;

    await book.save();
    res.status(200).json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
