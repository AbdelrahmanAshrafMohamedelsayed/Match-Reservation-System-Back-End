const express = require('express');
const matchController = require('../controllers/matchController');
const authController = require('../controllers/authControllers');

const matchRouter = express.Router();
matchRouter
  .route('/')
  .get(matchController.getAllMatches)
matchRouter.use(authController.protect);
matchRouter.route('/reserved_seats/:id').get(matchController.getReservedSeats);
matchRouter.use(authController.restrictTo('admin', 'manager'));
matchRouter
  .route('/')  
  .post(matchController.createMatch);
  matchRouter.route('/:id')
  .get(matchController.getMatch)
  .patch(matchController.updateMatch)
  .delete(matchController.deleteMatch);

matchRouter.route('/:id/reserve')   // :id = match id
.all(authController.protect)    // only need for auth middleware,  no role check middleware
.post(matchController.reserveTicket);

matchRouter.route('/:id/cancel')  // :id = match id
.all(authController.protect)
.post(matchController.cancelTicket); // pay load {ticketId: 1}
module.exports = matchRouter;
