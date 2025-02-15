const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoute = require('./routes/authRoute');
const userRoute = require('./routes/userRoute');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/auth', authRoute);
app.use('/user', userRoute);

app.use((req, res, next) => {

    req.setTimeout(0);
    next();
});


app.get('/', (req, res) => {
    res.send('Welcome to the Backend');
});

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
    .then(() => {
        console.log('MongoDB Connected');
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('MongoDB Connection Error:', err);
    });

module.exports = app;
