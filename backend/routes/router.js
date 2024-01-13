const express = require('express');
const router = express.Router();
const CharacterModel = require('../models/characterSchema');

router.post('/', (req, res) => {
    res.send('Backend Connection.');
})

router.post('/charup', (req, res) => {
    const {handle} = req.body;

    console.log(handle);
    res.send('Data received')
})

router.get('/characters', (req, res) => {

    const userData = CharacterModel.find({}).exec();

    if (userData) {
        res.send(JSON.stringify(userData));
    }
})

module.exports = router;