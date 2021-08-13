const { Card, validateC } = require('../models/cards');
const { Deck, validateD } = require('../models/cards');
const express = require('express');
const router = express.Router();

//All endpoints and routen handlers go here.

  //deck CRUD
router.get('/', async (req, res) => {
  try {
    const decks = await Deck.find();
    return res.send(decks);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

//expecting an id to be passed into the requestor’s URL endpoint. 
router.get('/:deckId', async (req, res) => {
  try {
    const deck = await Deck.findById(req.params.deckId);
    if (!deck)
      return res.status(400).send(`The product with id "${req.params.deckId}" does not exist.`);
    return res.send(deck);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});


router.post("/", async (req, res) => {
  try {
    const { error } = validateD(req.body);
    if (error) return res.status(400).send(error);

    const deck = new Deck({
      name: req.body.name,
      description: req.body.description,
      level: req.body.level,
    });
    await deck.save();

    return res.send(deck);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

router.put('/:deckId', async (req, res) => {
  try {
    const { error } = validateD(req.body);
    if (error) return res.status(400).send(error);

    const deck = await Deck.findByIdAndUpdate(
      req.params.deckId,
      {
        name: req.body.name,
        description: req.body.description,
        level: req.body.level,
      },
      { new: true }
    );
    if (!deck)
      return res.status(400).send(`The deck with id "${req.params.deckId}" does not exist.`);
    
    await deck.save();

    return res.send(deck);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

router.delete('/:deckId', async (req, res) => {
  try {
    const deck = await Deck.findByIdAndRemove(req.params.deckId);
    if (!deck)
      return res.status(400).send(`The deck with id "${req.params.deckId}" does not exist.`);
    
    return res.send(deck);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});



//CARD CRUD

  router.get('/:deckId/cards', async (req, res) => {
      try {
        const cards = await Card.find();
        return res.send(cards);
      } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
      }
    });
  

  //expecting an id to be passed into the requestor’s URL endpoint. 
  router.get('/:deckId/cards/:cardId', async (req, res) => {
    try {
      const card = await Card.findById(req.params.cardId);
      if (!card)
        return res.status(400).send(`The product with id "${req.params.cardId}" does not exist.`);
      return res.send(card);
    } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`);
    }
  });
  
  
  router.post("/:deckId/cards", async (req, res) => {
    try {
      const { error } = validateC(req.body);
      if (error) return res.status(400).send(error);
  
      const card = new Card({
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        level: req.body.level,
      });
      await card.save();
  
      return res.send(card);
    } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`);
    }
  });
  
  router.put('/:deckId/cards/:cardId', async (req, res) => {
    try {
      const { error } = validateC(req.body);
      if (error) return res.status(400).send(error);
  
      const card = await Card.findByIdAndUpdate(
        req.params.id,
        {
          name: req.body.name,
          description: req.body.description,
          category: req.body.category,
          level: req.body.price,
        },
        { new: true }
      );
      if (!card)
        return res.status(400).send(`The card with id "${req.params.cardId}" does not exist.`);
      
      await card.save();
  
      return res.send(card);
    } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`);
    }
  });
  
  router.delete('/:deckId/cards/:cardId', async (req, res) => {
    try {
      const card = await Card.findByIdAndRemove(req.params.cardId);
      if (!card)
        return res.status(400).send(`The card with id "${req.params.cardId}" does not exist.`);
      
      return res.send(card);
    } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`);
    }
  });




module.exports = router;