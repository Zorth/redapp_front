const mongoose = require('mongoose');

const charSchema = new mongoose.Schema({

    handle: {type:String, required: [true, "Enter CharacterHub Handle"]},
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
    HP: Number,
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
    ammo: {
        current: Number,
        chamberSize: Number,
        total: Number
    },
    baseIP: Number,
    IP: Number,
    cash: Number

})

const CharacterModel = mongoose.model('Chars', charSchema, 'starchild')

module.exports = CharacterModel;