const { json } = require("express");
const Booking = require("../models/Booking");
const jwt = require("jsonwebtoken");

const postBooking = async (req, res) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.json(null);
    }

    const user = await jwt.verify(token, process.env.JWT_SECRET);
    const { place, checkIn, checkOut, guests, mobile, name, price } = req.body;
    const booking = await Booking.create({
      place,
      checkIn,
      checkOut,
      guests,
      mobile,
      name,
      price,
      user: user.id,
    });

    res.json(booking);
  } catch (err) {
    res.json(err);
  }
};

const getAllBookings = async (req, res) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.json(null);
    }

    const user = await jwt.verify(token, process.env.JWT_SECRET);

    res.json(await Booking.find({ user: user.id }).populate("place"));
  } catch (error) {
    res.json(error);
  }
};

module.exports = { postBooking, getAllBookings };
