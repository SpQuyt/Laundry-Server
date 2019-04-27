const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectID;
const Schema = mongoose.Schema;

const billSchema = new Schema({
  "billID": String,
  "userID": ObjectId,
  "name": String,
  "services": {
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
  },
  "money": Number,
  "purchased": Boolean,
  "timeCreated": String
})

module.exports = billSchema