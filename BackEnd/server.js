// app.js (or index.js)
const express = require('express');
const app = express();
const db = require('./db');
const usersRouter = require('./usersRoute');
const cors = require('cors')

app.use(cors());
app.use('/api', usersRouter);
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
