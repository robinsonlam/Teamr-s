const { Router } = require('express');
const models = require('../db/models'); // Mongoose Model
const user = require("../db/controllers/UserController.js");

module.exports = new Router()
  // Show user
  .get('', async (req, res) => {
    try {
      const users = await models.User.find().sort({ "_id": 'asc' });
      res.json(users);
    } catch (e) {
      res.json({ error: e });
    }
  })
  .get('/show/:id', user.show)
  // Create user
  .get('/create', user.create)
  // Save user
  .post('/save', user.save)
  // Edit user
  .get('/edit/:id', user.edit)
  // Edit update
  .post('/update/:id', user.update)
  // De,ete update
  .post('/delete/:id', user.delete);
