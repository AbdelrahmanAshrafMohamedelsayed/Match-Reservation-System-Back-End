const mongoose = require('mongoose');
const crypto = require('crypto');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const refereeSchema = new mongoose.Schema({
 name: {
   type: String,
   required: [true, 'A referee must have a name'],
   unique: [true, 'This name is already taken'],
 },
 role:{
    type: String,
    enum: ['main', 'linesman'],
    default: 'main'
 },
});

const Referee = mongoose.model('Referee', refereeSchema); // create in the database a collection named 'Referee' with the schema 'refereeSchema'
module.exports = Referee;
