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
  })
  .post('/subscribe', async ({ body }, res) => {
    const { _teamId, _userId, role } = body;


    try {
      const team = await models.Team.findByIdAndUpdate(_teamId, {
        $addToSet: { members: _userId }
      });

      const user = await models.User.findByIdAndUpdate(_userId, {
        $addToSet: { teams: _teamId }
      });

      const existingTeamUser = await models.TeamUser.find({ _teamId, _userId });

      if (existingTeamUser.length) {
        const teamUser = await models.TeamUser.findOneAndUpdate({ _teamId, _userId }, {
          role,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
        });

        res.json({ status: 'Member already in team, updating details', teamUser, team, user });
      } else {
        const teamUser = new models.TeamUser({
          _teamId,
          _userId,
          role,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
         });

         res.json({ status: 'New member added to team', teamUser, team, user });
      }

      if (!team || !user) {
        res.json({ message: 'No team/user found', team, user});
      }
    } catch (e) {
      res.json({ error: `${e}` });
    }
  })
  .get('/:_teamId/members', async (req, res) => {
    const { _teamId } = req.params;
    try {
      const teamUsers = await models.TeamUser.find({ _teamId }).select('role first_name last_name email');

      if (teamUsers) {
        res.json({ members: teamUsers });
      } else {
        res.json({ message: 'No team found '});
      }
    } catch (e) {
      res.json({ error: `${e}` });
    }
  });
