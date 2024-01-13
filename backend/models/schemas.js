const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const charSchema = new Schema({
    handle: {type:String}

})

const Character = mongoose.model('Chars', charSchema, 'starchild')
const mySchemas = {'Chars':Character}

module.exports = mySchemas;