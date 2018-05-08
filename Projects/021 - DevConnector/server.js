const express = require('express');
const mongoose = require('mongoose');

// Routes
const users = require('./routes/api/users');
const profiles = require('./routes/api/profiles');
const posts = require('./routes/api/posts');

const app = express();
const PORT = process.env.PORT || 5000;

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to mongodb
mongoose
    .connect(db)
    .then(() => console.log('MongoDB connected!'))
    .catch((e) => console.error(e));

// Use Routes
app.use('/api/users', users);
app.use('/api/profiles', profiles);
app.use('/api/posts', posts);

app.get('/', (req, res) => res.send('Hello'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));