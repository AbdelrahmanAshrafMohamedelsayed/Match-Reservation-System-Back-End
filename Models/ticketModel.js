const mongoose = require('mongoose');
const crypto = require('crypto');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const ticketSchema = new mongoose.Schema({
  seatNumber: {
    type: Number,
    required: [true, 'A ticket must have a seat number'],
    unique: [true, 'This seat number is already taken']
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'A ticket must have a user']
  },
  match: {
    type: mongoose.Schema.ObjectId,
    ref: 'Match',
    required: [true, 'A ticket must have an match']
  }
});

const Ticket = mongoose.model('Ticket', ticketSchema); // create in the database a collection named 'Ticket' with the schema 'ticketSchema'
module.exports = Ticket;
