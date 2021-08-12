const { Card, validate } = require('../models/cards');
const Deck = require('../models/deck');
const express = require('express');
const router = express.Router();

//All endpoints and routen handlers go here.

router.get('/', async (req, res) => {
    try {
      const cards = await Card.find();
      return res.send(cards);
    } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`);
    }
  });
  
  //expecting an id to be passed into the requestor’s URL endpoint. 
  router.get('/:id', async (req, res) => {
    try {
      const card = await Card.findById(req.params.id);
      if (!card)
        return res.status(400).send(`The product with id "${req.params.id}" does not exist.`);
      return res.send(card);
    } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`);
    }
  });
  
  
  router.post("/", async (req, res) => {
    try {
      const { error } = validate(req.body);
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
  
  router.put('/:id', async (req, res) => {
    try {
      const { error } = validate(req.body);
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
        return res.status(400).send(`The card with id "${req.params.id}" does not exist.`);
      
      await card.save();
  
      return res.send(card);
    } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`);
    }
  });
  
  router.delete('/:id', async (req, res) => {
    try {
      const card = await Card.findByIdAndRemove(req.params.id);
      if (!card)
        return res.status(400).send(`The card with id "${req.params.id}" does not exist.`);
      
      return res.send(card);
    } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`);
    }
  });

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
  router.get('/:id', async (req, res) => {
    try {
      const deck = await Deck.findById(req.params.id);
      if (!deck)
        return res.status(400).send(`The product with id "${req.params.id}" does not exist.`);
      return res.send(deck);
    } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`);
    }
  });
  
  
  router.post("/", async (req, res) => {
    try {
      const { error } = validate(req.body);
      if (error) return res.status(400).send(error);
  
      const deck = new Deck({
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        level: req.body.level,
      });
      await deck.save();
  
      return res.send(deck);
    } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`);
    }
  });
  
  router.put('/:id', async (req, res) => {
    try {
      const { error } = validate(req.body);
      if (error) return res.status(400).send(error);
  
      const deck = await Deck.findByIdAndUpdate(
        req.params.id,
        {
          name: req.body.name,
          description: req.body.description,
          category: req.body.category,
          level: req.body.level,
        },
        { new: true }
      );
      if (!deck)
        return res.status(400).send(`The deck with id "${req.params.id}" does not exist.`);
      
      await deck.save();
  
      return res.send(deck);
    } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`);
    }
  });
  
  router.delete('/:id', async (req, res) => {
    try {
      const deck = await Deck.findByIdAndRemove(req.params.id);
      if (!deck)
        return res.status(400).send(`The deck with id "${req.params.id}" does not exist.`);
      
      return res.send(deck);
    } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`);
    }
  });

module.exports = router;