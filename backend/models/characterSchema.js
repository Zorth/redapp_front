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
    wound: Number,
    HUM: Number,
    headArmor: {
        name: String,
        baseSP: Number,
        SP: Number
    },
    bodyArmor: {
        name: String,
        baseSP: Number,
        SP: Number
    },
    equipment: [],
    weapons: [{
        name: String,
        skill: String,
        ammo: String,
        dmg: String,
        loaded: Number,
        mag: Number,
        ROF: Number,
        conceal: Boolean,
        autofire: Number,
        explosive: Boolean
    }],
    cyberware: [],
    ammo: {
        name: String,
        count: Number
    },
    baseIP: Number,
    IP: Number,
    cash: Number

})

const CharacterModel = mongoose.model('Chars', charSchema, 'starchild')

module.exports = CharacterModel;