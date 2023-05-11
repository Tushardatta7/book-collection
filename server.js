const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Books array
const books = [];

// Route to serve the index.html file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Route to get the books array
app.get('/books', (req, res) => {
  res.json(books);
});

// Route to add a book to the books array
app.post('/books', (req, res) => {
  const book = req.body;
  book.id = books.length + 1;
  books.push(book);
  res.json(book);
});

// Route to delete a book from the books array
app.delete('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = books.findIndex(book => book.id === id);
  if (index !== -1) {
    books.splice(index, 1);
    res.json({ message: 'Book deleted' });
  } else {
    res.json({ message: 'Book not found' });
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
