const Book = require('../models/Book');
const Review = require('../models/Review');

exports.submitReview = async (req, res) => {
  const { id } = req.params;
  const { rating, comment } = req.body;
  const username = req.user.name;

  try {
    const existing = await Review.findOne({ user: username, book: id });
    if (existing) return res.status(400).json({ message: 'You already reviewed this book' });

    const review = new Review({ user: username, book: id, rating, comment });
    await review.save();

    res.status(201).json({ message: 'Review submitted', review });
  } catch (err) {
    res.status(500).json({ message: 'Error submitting review', error: err.message });
  }
};

exports.updateReview = async (req, res) => {
  const { id } = req.params;
  const { rating, comment } = req.body;
  const username = req.user.name;
  console.log(username);

  try {
    const review = await Review.findById(id);
    if (!review || review.user !== username)
      return res.status(403).json({ message: 'Unauthorized or review not found' });

    review.rating = rating ?? review.rating;
    review.comment = comment ?? review.comment;
    await review.save();

    res.json({ message: 'Review updated', review });
  } catch (err) {
    res.status(500).json({ message: 'Error updating review', error: err.message });
  }
};


exports.deleteReview = async (req, res) => {
  const { id } = req.params;
  const username = req.user.name;

  try {
    const review = await Review.findById(id);
    if (!review || review.user != username){
        return res.status(403).json({ message: 'Unauthorized or review not found' });
    }

    await review.deleteOne();
    res.json({ message: 'Review deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting review', error: err.message });
  }
};