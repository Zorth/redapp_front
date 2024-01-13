const express = require('express');
const router = express.Router();
const schemas = require('../models/schemas');

router.post('/charup', (req, res) => {
    const {handle} = req.body;

    console.log(handle);
    res.send('Data received')
})

router.get('/characters', (req, res) => {
    const users = schemas.Chars;
    const userData = users.find({}).exec();

    if (userData) {
        res.send(JSON.stringify(userData));
    }
})

module.exports = router;