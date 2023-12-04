
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://srmate:srmate@clusterheliverse.hzzqago.mongodb.net/userheliverse?retryWrites=true&w=majority');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB database');
});
