// app.js (or index.js)
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const usersRouter = require('./usersRoute');
const cors = require('cors')


app.use(cors());
app.use('/api', usersRouter);
// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

mongoose.connect('mongodb+srv://srmate:srmate@clusterheliverse.hzzqago.mongodb.net/userheliverse?retryWrites=true&w=majority');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB database');
});


app.get('/', (req, res) => {
    res.send("<h3>working fine </h3>")
});

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
