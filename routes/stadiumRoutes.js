const express = require('express');
const stadiumController = require('../controllers/stadiumController');
const authController = require('../controllers/authControllers');

const stadiumRouter = express.Router();

stadiumRouter.use(authController.protect);
stadiumRouter.use(authController.restrictTo('admin', 'manager'));
stadiumRouter
  .route('/')
  .get(stadiumController.getAllStadiums)
  .post(stadiumController.createStadium);
  stadiumRouter.route('/:id')
  .get(stadiumController.getStadium)
  .patch(stadiumController.updateStadium)
  ;
module.exports = stadiumRouter;
