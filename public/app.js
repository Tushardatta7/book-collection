const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = 3000;

// Middleware to parse request bodies as JSON
app.use(express.json());

// Serve the static index.html file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Set up an empty array to hold the books
const books = [];

// Route to get all books
app.get('/books', (req, res) => {
  res.json(books);
});

// Route to add a new book
app.post('/books', (req, res) => {
  const { title, author, publishedDate } = req.body;
  if (!title || !author) {
    res.status(400).send('Title and author are required');
    return;
  }
  const book = {
    id: uuidv4(),
    title,
    author,
    publishedDate
  };
  books.push(book);
  res.json(book);
});

// Route to delete a book
app.delete('/books/:id', (req, res) => {
  const id = req.params.id;
  const index = books.findIndex(book => book.id === id);
  if (index === -1) {
    res.status(404).send('Book not found');
    return;
  }
  books.splice(index, 1);
  res.json({ message: 'Book deleted successfully' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
