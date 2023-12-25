const Match = require('../Models/matchModel');
const factory = require('./handlerFactory');
const catchAsync = require('./../util/catchAsync');
const AppError = require('./../util/ErrorHandling');
const Ticket = require('../Models/ticketModel');

exports.getAllMatches = factory.getAll(Match);
exports.getMatch = factory.getOne(Match);
exports.updateMatch = factory.updateOne(Match);
exports.deleteMatch = factory.deleteOne(Match);
exports.getReservedSeats = factory.getOne(Match, ['tickets.seatNumber']);
exports.createMatch = catchAsync(async (req, res, next) => {
  const existingMatch = await Match.findOne(req.body);

  if (existingMatch) {
    return res.status(401).json({
      status: 'failed',
      error: {
        message: 'This match is already created.'
      }
    });
  }

  const newMatch = await Match.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      match: newMatch
    }
  });
});
function checkSeats(seatNumbers, match) {
  const { tickets } = match;
  const reservedSeats = tickets.map(ticket => ticket.seatNumber);
  // ensure that the seatNumbers are not already reserved
  const isReserved = seatNumbers.some(seatNumber =>
    reservedSeats.includes(seatNumber)
  );
  return isReserved;
}
exports.reserveTicket = catchAsync(async (req, res, next) => {
  const match = await Match.findById(req.params.id);
  if (!match) {
    return next(new AppError('No match found with that ID', 404));
  }
  const { seatNumbers } = req.body;
  //  seatNumbers is an array of numbers
  //  check if the seatNumbers are already reserved
  const isReserved = checkSeats(seatNumbers, match);
  if (isReserved) {
    return next(new AppError('This seat is already reserved', 400));
  }
  // reserve the seats
  const tickets = seatNumbers.map(seatNumber => ({
    seatNumber,
    user: req.user.id,
    match: req.params.id
  }));
  //  create the tickets
  const reservedTickets = await Ticket.create(tickets);
  //  add the tickets to the match
  match.tickets.push(...reservedTickets);
  //  save the match
  await match.save();
  res.status(200).json({
    status: 'success',
    data: {
      match
    }
  });
});
exports.cancelTicket = catchAsync(async (req, res, next) => {
  const match = await Match.findById(req.params.id);
  if (!match) {
    return next(new AppError('No match found with that ID', 404));
  }
  const { ticketId } = req.body;
  //  check if the ticketId is valid
  const ticket = await Ticket.findById(ticketId);
  if (!ticket) {
    return next(new AppError('No ticket found with that ID', 404));
  }
  //  check if the ticket is reserved
  const isReserved = match.tickets.some(
    tickety => tickety.id === ticketId && tickety.user.id === req.user.id
  );
  if (!isReserved) {
    return next(new AppError('This ticket is not reserved by you', 400));
  }
  //  delete the ticket
  await Ticket.findByIdAndDelete(ticketId);
  //  remove the ticket from the match
  match.tickets.splice(match.tickets.indexOf(ticketId), 1);
  //  save the match
  await match.save();
  res.status(200).json({
    status: 'success',
    data: {
      match
    }
  });
});