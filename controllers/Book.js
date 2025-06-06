const Book = require('../models/Book');
const Review = require('../models/Review');

exports.addBook = async (req, res) => {
  const { name, author, genre } = req.body;

  if (!name || !author || !genre) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newBook = new Book({ name, author, genre });
    await newBook.save();
    res.status(201).json({ message: 'Book added successfully', book: newBook });
  } catch (err) {
    res.status(500).json({ message: 'Error adding book', error: err.message });
  }
};

exports.getBooks = async (req, res) => {
  try {
    const { page = 1, limit = 10, author, genre } = req.query;

    const query = {};
    if (author) query.author = author;
    if (genre) query.genre = genre;

    const books = await Book.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Book.countDocuments(query);

    res.json({
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(total / limit),
      books
    });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching books', error: err.message });
  }
};

exports.getBookById = async (req, res) => {
  const { id } = req.params;
  const { page = 1, limit = 5 } = req.query;

  try {
    const book = await Book.findById(id);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    const reviews = await Review.find({ book: id })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const average = await Review.aggregate([
      { $match: { book: book._id } },
      { $group: { _id: null, avgRating: { $avg: '$rating' } } }
    ]);

    res.json({
      book,
      averageRating: average[0]?.avgRating || 0,
      reviews
    });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching book', error: err.message });
  }
};


exports.searchBooks = async (req, res) => {
  const { title, author } = req.query;
  console.log(title,author);

  if (!title && !author) {
    return res.status(400).json({ message: 'Please provide a title or author to search' });
  }

  const query = {};

  if (title) {
    query.name = { $regex: title, $options: 'i' }; 
  }

  if (author) {
    query.author = { $regex: author, $options: 'i' };
  }

  try {
    const books = await Book.find(query);
    res.json({ results: books });
  } catch (err) {
    res.status(500).json({ message: 'Error searching books', error: err.message });
  }
};
