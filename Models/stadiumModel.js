const mongoose = require('mongoose');
const crypto = require('crypto');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const MINIMUN_CAPACITY = 10000

const stadiumSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A stadium must have a name'],
    unique: [true, 'This name is already taken']
  },
  location: {
    type: String,
    required: [true, 'A stadium must have a location']
  },
  capacity: {
    type: Number,
    required: [true, 'A stadium must have a capacity'],
    min: [MINIMUN_CAPACITY, `Minimum Stadium Capacity is ${MINIMUN_CAPACITY}`]
  },
  photo: {
    type: String,
    default: 'default.jpg'
  }
});

const Stadium = mongoose.model('Stadium', stadiumSchema); // create in the database a collection named 'Stadium' with the schema 'stadiumSchema'
module.exports = Stadium;
