'use strict';

const mongoose = require('mongoose');

const Toy = mongoose.Schema({
  'toy_id' : { type: String },
  'name' : { type: String },
  'maker' : { type: String},
}, { timestamps: true});

module.exports = mongoose.model('toys', Toy);