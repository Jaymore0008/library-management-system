const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());

// In-memory array to store books
let books = [];

// Add a new book
app.post('/add-book', (req, res) => {
    const { title, author, genre } = req.body;
    const book = { id: books.length + 1, title, author, genre };
    books.push(book);
    res.json({ message: 'Book added successfully', book });
});

// Get all books
app.get('/books', (req, res) => {
    res.json(books);
});

// Search for a book by title or author
app.get('/search', (req, res) => {
    const { query } = req.query;
    const result = books.filter(book => 
        book.title.toLowerCase().includes(query.toLowerCase()) || 
        book.author.toLowerCase().includes(query.toLowerCase())
    );
    res.json(result);
});

// Delete a book by ID
app.delete('/delete-book/:id', (req, res) => {
    const { id } = req.params;
    books = books.filter(book => book.id != id);
    res.json({ message: 'Book deleted successfully' });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
