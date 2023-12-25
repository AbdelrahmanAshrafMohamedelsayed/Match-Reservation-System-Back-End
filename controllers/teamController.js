const Team = require('../Models/teamModel');
const factory = require('./handlerFactory');
const catchAsync = require('../util/catchAsync');
const AppError = require('../util/ErrorHandling');

exports.getAllTeams = factory.getAll(Team);
exports.getTeam = factory.getOne(Team);
exports.createTeam = factory.createOne(Team);
exports.updateTeam = factory.updateOne(Team);