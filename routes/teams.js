const { Router } = require('express');
const models = require('../db/models'); // Mongoose Model

module.exports = new Router()
  .get('', async (req, res) => {
    try {
      const teams = await models.Team.find().sort({ "_id": 'asc' });
      res.json(teams);
    } catch (e) {
      res.json({ error: e });
    }
  })
  .post('', async ({ body }, res) => {
    const { name, sport } = body;
    console.log(name, sport);

    try {
      const team = await models.Team.findOrCreate({ name, sport })
      res.json({ status: 'success', team });
    } catch (e) {
      res.json({ error: e });
    }
  });
