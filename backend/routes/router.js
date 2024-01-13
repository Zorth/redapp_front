const express = require('express');
const router = express.Router();
const CharacterModel = require('../models/characterSchema');

router.post('/', (req, res) => {
    res.send('Backend Connection.');
})

router.get('/characters', async (req, res) => {

    try {
        const characters = await CharacterModel.find({});
        res.status(200).json(characters);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

router.get('/characters/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const character = await CharacterModel.findById(id);
        res.status(200).json(character);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

router.post('/characters', async (req, res) => {
    try {
        const character = await CharacterModel.create(req.body)
        res.status(200).json(character);

    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

// update a product
router.put('/characters/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const character = await CharacterModel.findByIdAndUpdate(id, req.body);
        // we cannot find any product in database
        if (!character) {
            return res.status(404).json({message: `cannot find any product with ID ${id}`})
        }
        const updatedProduct = await CharacterModel.findById(id);
        res.status(200).json(updatedProduct);

    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// router.delete('/products/:id', async(req, res) =>{
//     try {
//         const {id} = req.params;
//         const character = await CharacterModel.findByIdAndDelete(id);
//         if(!character){
//             return res.status(404).json({message: `cannot find any product with ID ${id}`})
//         }
//         res.status(200).json(character);
//
//     } catch (error) {
//         res.status(500).json({message: error.message})
//     }
// })

module.exports = router;