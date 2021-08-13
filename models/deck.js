const mongoose = require('mongoose');
const Joi = require ('joi');



const deckSchema = new mongoose.Schema({
    name:  { type: String, required: true, minlength: 2, maxlength: 255 },
    description: { type: String, required: true, minlength: 2, maxlength: 255 },
    level: { type: String, required: true },
    dateModified: { type: Date, default: Date.now },
});

const Deck = mongoose.model('Deck', deckSchema);

function validateDeck(deck) {
    const schema = Joi.object({
        name: Joi.string().min(2).max(50).required(),
        description: Joi.string().required(),
        level: Joi.string().required(),
    });
    return schema.validate(deck);
}

exports.Deck = Deck; 
exports.validate = validateDeck; 
exports.deckSchema = deckSchema;