
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    avatar: String,
    first_name: String,
    last_name: String,
    email: String,
    gender: String,
    domain: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
