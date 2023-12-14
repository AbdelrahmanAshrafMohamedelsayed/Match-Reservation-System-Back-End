const Stadium = require('../Models/stadiumModel');
const factory = require('./handlerFactory');
const catchAsync = require('./../util/catchAsync');
const AppError = require('./../util/ErrorHandling');

exports.getAllStadiums = factory.getAll(Stadium);
exports.getStadium = factory.getOne(Stadium);
exports.createStadium = factory.createOne(Stadium);
exports.updateStadium = factory.updateOne(Stadium);