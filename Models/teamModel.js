const mongoose = require('mongoose');
const crypto = require('crypto');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const teamSchema = new mongoose.Schema({
 name: {
   type: String,
   required: [true, 'A team must have a name'],
   unique: [true, 'This name is already taken'],
 },
 photo: {
   type: String,
   default: 'default2.jpg'
 },
});

const Team = mongoose.model('Team', teamSchema); // create in the database a collection named 'Team' with the schema 'teamSchema'
module.exports = Team;
