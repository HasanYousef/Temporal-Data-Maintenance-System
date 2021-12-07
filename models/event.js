const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({

  firstName: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
    required: true,
  },

  loincNum: {
    type: String,
    required: true,
  },

  value: {
    type: String,
    reuired: true,
  },

  unit: {
    type: String,
    required: true,
  },

  validStartTime: {
    type: String,
    reuired: true,
  },

  transactionTime: {
    type: String,
    reuired: true,
  },

}, { timestamps: true });   // this will add a time field for which time the event entered the DB (not the given transaction time)

const Event = mongoose.model('events', EventSchema);
module.exports = Event;