const express = require('express');
const { signup, login } = require('./controllers/User');
const {addBook, getBooks, getBookById, searchBooks} = require('./controllers/Book');
const {submitReview, updateReview, deleteReview} = require('./controllers/Review')
const {authenticateToken} = require('./middlewares/authenticate');


const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

router.post('/books', authenticateToken, addBook);
router.get('/books', getBooks);
router.get('/books/:id', getBookById);

router.post('/books/:id/reviews', authenticateToken, submitReview);
router.put('/reviews/:id', authenticateToken, updateReview);
router.delete('/reviews/:id', authenticateToken, deleteReview);

router.get('/search', searchBooks);

module.exports = router;
