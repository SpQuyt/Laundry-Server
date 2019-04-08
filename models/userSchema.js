const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectID;
var Schema = mongoose.Schema;

var userSchema = new Schema({
  "username": String,
  "password": String,
  "fullname": String,
  "address": String,
  "price": {
    "dry": Number,
    "wet": Number,
    "jacket": {
      "big": Number,
      "medium": Number,
      "small": Number
    },
    "blanket": {
      "big": Number,
      "medium": Number,
      "small": Number
    },
    "others": {
      "name": String,
      "total": Number
    }
  }
})

module.exports = userSchema