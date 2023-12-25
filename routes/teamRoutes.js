const express = require('express');
const teamController = require('../controllers/teamController');

const teamRouter = express.Router();
teamRouter
  .route('/')
  .get(teamController.getAllTeams)
  .post(teamController.createTeam);
  teamRouter.route('/:id')
  .get(teamController.getTeam)
  .patch(teamController.updateTeam)

module.exports = teamRouter;
