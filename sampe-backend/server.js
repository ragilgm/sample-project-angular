const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 10011;

// Set up body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Middleware untuk mengizinkan CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4300'); 
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});


// Dummy data (array)
let users = [];

// Create a new user
app.post('/users', (req, res) => {
    const { name, email } = req.body;
    const user = { id: users.length + 1, name, email };
    users.push(user);
    res.json({ message: 'User created successfully.' });
});

// Get all users
app.get('/users', (req, res) => {
    res.send(users);
});

// Get a specific user by id
app.get('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find(user => user.id === id);
    if (!user) {
        return res.status(404).json({ message: 'User not found.' });
    }
    res.send(user);
});

// Update a user by id
app.put('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { name, email } = req.body;
    const index = users.findIndex(user => user.id === id);
    if (index === -1) {
        return res.status(404).json({ message: 'User not found.' });
    }
    users[index] = { id, name, email };
    res.json({ message: 'Update user successfully.' });
});

// Delete a user by id
app.delete('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = users.findIndex(user => user.id === id);
    if (index === -1) {
        return res.status(404).json({ message: 'User not found.' });
    }
    users.splice(index, 1);
    res.json({ message: 'User deleted successfully.' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
