const connectDB = require('./startup/db');
const express = require('express');
const app = express();
const cors = require('cors');

// const cards = require('./routes/deck');
const decks = require('./routes/deck');

connectDB(); 


app.use(cors())
app.use(express.json());
// app.use('/api/cards', cards);
app.use('/api/decks', decks);

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});