const { Router } = require('express');

require('../db/models/User.js');
require('../db/models/Team.js');

const users = require('./users');
const teams = require('./teams');

const createRouter = (auth) => {
  const router = new Router();

  router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
  });
  
  router.use('/users', users);
  router.use('/teams', teams);

  return router;
};

module.exports = createRouter;
