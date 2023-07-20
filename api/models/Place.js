const mongoose = require("mongoose");

const PlaceSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  photos: {
    type: [String],
  },
  description: {
    type: String,
  },
  perks: {
    type: [String],
  },
  extraInfo: {
    type: String,
  },

  price: {
    type: Number,
    required: true,
  },

  checkIn: Number,
  checkOut: Number,
  maxGuests: Number,
});

module.exports = mongoose.model("Place", PlaceSchema);
