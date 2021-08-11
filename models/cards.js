const mongoose = require('mongoose');
const Joi = require ('joi');



const cardSchema = new mongoose.Schema({
    name:  { type: String, required: true, minlength: 2, maxlength: 255 },
    description: { type: String, required: true, minlength: 2, maxlength: 255 },
    category: { type: String, required: true, minlength: 2, maxlength: 15 },
    level: { type: String, required: true },
    dateModified: { type: Date, default: Date.now },
});

const Card = mongoose.model('Card', cardSchema);

function validateCard(card) {
    const schema = Joi.object({
        name: Joi.string().min(2).max(50).required(),
        description: Joi.string().required(),
        category: Joi.string().min(5).max(50).required(),
        level: Joi.string().required(),
    });
    return schema.validate(card);
}

exports.Card = Card; 
exports.validate = validateCard; 
exports.cardSchema = cardSchema; 