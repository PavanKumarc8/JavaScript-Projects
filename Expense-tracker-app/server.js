const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');

// Create an instance of express
const app = express();
const port = 3000;

// MongoDB connection string
const dbUri = 'mongodb://localhost:27017/Pavan'; // Replace 'your_database_name' with your actual database name

// Connect to MongoDB
mongoose.connect(dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully!'))
.catch(err => console.log('MongoDB connection error:', err));

// Middleware for sessions
app.use(session({
    secret: 'your_secret_key', // Replace with a strong secret key
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: dbUri }), // Store sessions in MongoDB
}));

// Serve static files from the "public" directory
app.use(express.static('public'));

// Route to send the main HTML page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html'); // Adjust the path if necessary
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
