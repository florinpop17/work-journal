const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to mongodb
mongoose
    .connect(db)
    .then(() => console.log('MongoDB connected!'))
    .catch((e) => console.error(e));

app.get('/', (req, res) => res.send('Hello'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));