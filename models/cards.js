const mongoose = require('mongoose');
const Joi = require ('joi');


const cardSchema = new mongoose.Schema({
    question:  { type: String, required: true, minlength: 2, maxlength: 255 },
    answer: { type: String, required: true, minlength: 2, maxlength: 255 },
    dateModified: { type: Date, default: Date.now },
});

const Card = mongoose.model('Card', cardSchema);

function validateCard(card) {
    const schema = Joi.object({
        question: Joi.string().min(2).max(80).required(),
        answer: Joi.string().required(),
    });
    return schema.validate(card);
}

const deckSchema = new mongoose.Schema({
    name:  { type: String, required: true, minlength: 2, maxlength: 255 },
    description: { type: String, required: true, minlength: 2, maxlength: 255 },
    level: { type: String, required: true },
    cardSet: [cardSchema],
    dateModified: { type: Date, default: Date.now },
});

const Deck = mongoose.model('Deck', deckSchema);

function validateDeck(deck) {
    const schema = Joi.object({
        name: Joi.string().min(2).max(50).required(),
        description: Joi.string().required(),
        level: Joi.string().required(),
        cardSet: Joi.array(),
    });
    return schema.validate(deck);
}

exports.Card = Card; 
exports.validateC = validateCard; 
exports.cardSchema = cardSchema; 
exports.Deck = Deck; 
exports.validateD = validateDeck; 
exports.deckSchema = deckSchema;