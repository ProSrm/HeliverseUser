// users.route.js
const express = require('express');
const router = express.Router();
const User = require('./usersModel');


router.get('/', (req, res) => {
    res.json("connected to main root route ");
})

router.get('/users', async (req, res) => {


    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// for search by name 
router.get('/users/search', async (req, res) => {
    const searchQuery = req.query.name;
    try {
        let query = {};
        if (searchQuery) {
            const regex = new RegExp(`^${searchQuery}$`, 'i');
            query = { first_name: regex };
        }
        const users = await User.find(query);

        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//fiters domain , gender ,  Availability
router.get('/users/filter', async (req, res) => {
    try {
        const { domain, gender, available } = req.query;
        let query = {};

        if (domain) {
            query.domain = domain;
        }

        if (gender) {
            query.gender = gender;
        }

        if (available !== undefined) {
            query.available = available === 'true' ? true : false; // Convert string to boolean
        }

        const users = await User.find(query);
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;
