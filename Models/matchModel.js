const mongoose = require('mongoose');
// const crypto = require('crypto');
// const validator = require('validator');
// const bcrypt = require('bcryptjs');

const matchSchema = new mongoose.Schema({
  homeTeam: {
    type: mongoose.Schema.ObjectId,
    ref: 'Team',
    required: [true, 'A match must have a home team']
  },
  awayTeam: {
    type: mongoose.Schema.ObjectId,
    ref: 'Team',
    required: [true, 'A match must have an away team'],
    validate: {
      validator: function(value) {
        return String(value) !== String(this.homeTeam);
      },
      message: 'A match must have two different teams'
    }
  },
  date: {
    type: Date,
    required: [true, 'A match must have a date']
  },
  stadium: {
    type: mongoose.Schema.ObjectId,
    ref: 'Stadium',
    required: [true, 'A match must have a stadium']
  },

  tickets: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Ticket'
    }
  ],
  referee: {
    type: mongoose.Schema.ObjectId,
    ref: 'Referee',
    required: [true, 'A match must have a referee'],
    validate: {
      validator: function(value) {
        return value !== this.linesman1 && value !== this.linesman2;
      },
      message: 'A match must have three different referees'
    }
  },
  linesman1: {
    type: mongoose.Schema.ObjectId,
    ref: 'Referee',
    required: [true, 'A match must have a linesman1'],
    validate: {
      validator: function(value) {
        return value !== this.referee && value !== this.linesman2;
      },
      message: 'A match must have three different referees'
    }
  },
  linesman2: {
    type: mongoose.Schema.ObjectId,
    ref: 'Referee',
    required: [true, 'A match must have a linesman2'],
    validate: {
      validator: function(value) {
        return value !== this.referee && value !== this.linesman1;
      },
      message: 'A match must have three different referees'
    }
  }
});
matchSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'tickets' // the field that we want to populate
  });
  next();
});
const Match = mongoose.model('Match', matchSchema); // create in the database a collection named 'Match' with the schema 'matchSchema'
module.exports = Match;
