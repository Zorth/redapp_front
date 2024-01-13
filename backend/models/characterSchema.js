const mongoose = require('mongoose');

const charSchema = new mongoose.Schema({

    handle: {type:String, required: [true, "Enter Character Handle"]},
    full_name: {type:String},
    stats: {
        INT: Number,
        REF: Number,
        DEX: Number,
        TECH: Number,
        COOL: Number,
        WILL: Number,
        LUCK: Number,
        MOVE: Number,
        BODY: Number,
        baseEMP: Number,
        EMP: Number
    },
    skills: [],
    baseHP: Number,
    HP: Number,
    baseHUM: Number,
    HUM: Number,
    headArmor: {
        Name: String,
        baseSP: Number,
        SP: Number
    },
    bodyArmor: {
        Name: String,
        baseSP: Number,
        SP: Number
    },
    equipment: [],
    cyberware: [],
    cash: Number

})

const CharacterModel = mongoose.model('Chars', charSchema, 'starchild')

module.exports = CharacterModel;