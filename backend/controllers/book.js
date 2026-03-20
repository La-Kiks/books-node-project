const Book = require("../models/book");

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
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
