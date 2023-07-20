const Place = require("../models/Place");
const jwt = require("jsonwebtoken");

const addPlaces = async (req, res) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.json(null);
    }

    const {
      title,
      address,
      addedPhotos,
      photoLink,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    } = req.body;

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    const place = await Place.create({
      owner: decoded.id,
      title,
      address,
      photos: addedPhotos,
      photoLink,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    });

    res.json(place);
  } catch (error) {
    res.json(error);
  }
};

const getPlaces = async (req, res) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.json(null);
    }
    const user = await jwt.verify(token, process.env.JWT_SECRET);
    const { id } = user;
    const places = await Place.find({ owner: id });
    res.json(places);
  } catch (error) {
    res.json(error);
  }
};

const getPlace = async (req, res) => {
  const { id } = req.params;
  res.json(await Place.findById(id));
};

const putPlace = async (req, res) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.json(null);
    }
    const user = await jwt.verify(token, process.env.JWT_SECRET);
    const { id: uid } = user;
    const {
      title,
      address,
      addedPhotos: photos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      id,
      price,
    } = req.body;

    const place = await Place.findById(id);

    if (place.owner.toString() === uid) {
      await place.set({
        title,
        address,
        photos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price,
      });

      await place.save();
    }

    res.json("ok");
  } catch (err) {
    res.json(err);
  }
};

const getAllPlaces = async (req, res) => {
  res.json(await Place.find());
};

module.exports = { addPlaces, getPlaces, getPlace, putPlace, getAllPlaces };
