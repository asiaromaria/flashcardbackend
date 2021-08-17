const { Card, validateC, deckSchema } = require('../models/cards');
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
      cardSet: req.body.cardSet,
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
        cardSet: req.body.cardSet,
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
        //This part gets single deck in order to access its cardset collection.
      const deck = await Deck.findById(req.params.deckId);
      if (!deck)
        return res.status(400).send(`The product with id "${req.params.deckId}" does not exist.`);
        return res.send(deck.cardSet);
      } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
      }
    });
  

  //expecting an id to be passed into the requestor’s URL endpoint. 
  router.get('/:deckId/cards/:cardId', async (req, res) => {
    try {
      //This part gets single deck in order to access its cardset collection.
      const deck = await Deck.findById(req.params.deckId);
      if (!deck)
        return res.status(400).send(`The product with id "${req.params.deckId}" does not exist.`);
      const cardArray = await deck.cardSet.filter((card) => card._id == req.params.cardId)
      if (cardArray.length === 0)
        return res.status(400).send(`The product with id "${req.params.cardId}" does not exist.`);
      return res.send(cardArray[0]);
    } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`);
    }
  });
  
  
  router.post("/:deckId/cards", async (req, res) => {
    try {
      //This part gets single deck in order to access its cardset collection.
      const deck = await Deck.findById(req.params.deckId);
      if (!deck)
        return res.status(400).send(`The product with id "${req.params.deckId}" does not exist.`);
      //validate the body before returning something.
      const { error } = validateC(req.body);
      if (error) return res.status(400).send(error);
  
      const card = new Card({
        question: req.body.question,
        answer: req.body.answer,
      });
      
      deck.cardSet.push(card);
      await deck.save();
      await card.save();
      
      return res.send(card);
    } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`);
    }
  });
  
  router.put('/:deckId/cards/:cardId', async (req, res) => {
    try {
      const deck = await Deck.findById(req.params.deckId);
      if (!deck)
        return res.status(400).send(`The product with id "${req.params.deckId}" does not exist.`);
      
      const cardIndex=deck.cardSet.findIndex((card) => card._id == req.params.cardId)
      if (cardIndex== -1)
        return res.status(400).send(`The card with id "${req.params.cardId}" does not exist.`);
      
      const { error } = validateC(req.body);
      if (error) return res.status(400).send(error);
  
      const card = await Card.findByIdAndUpdate(
        req.params.cardId,
        {
          question: req.body.question,
          answer: req.body.answer,
        },
        { new: true }
      );        
      await deck.save();
      
      return res.send(deck.cardSet[cardIndex]);
    } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`);
    }
  });
  
  router.delete('/:deckId/cards/:cardId', async (req, res) => {
    try {
      const deck = await Deck.findById(req.params.deckId);
      if (!deck)
        return res.status(400).send(`The product with id "${req.params.deckId}" does not exist.`);
      
      const cardIndex=deck.cardSet.findIndex((card) => card._id == req.params.cardId)
      if (cardIndex== -1)
        return res.status(400).send(`The card with id "${req.params.cardId}" does not exist.`);

      const cardDeleted = await deck.cardSet[cardIndex];
      deck.cardSet.splice([cardIndex, 1])
      await deck.save();
      
      return res.send(cardDeleted);
    } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`);
    }
  });




module.exports = router;