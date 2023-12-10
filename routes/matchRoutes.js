const express = require('express');
const matchController = require('../controllers/matchController');

const router = express.Router();
router
  .route('/')
  .get(matchController.getAllMatches)
  .post(matchController.createMatch);
router.route('/:id').get(matchController.getMatch);

router.route('/:id/reserve').post(matchController.reserveTicket);
router.route('/:id/cancel').post(matchController.cancelTicket); // pay load {ticketId: 1}
module.exports = router;
