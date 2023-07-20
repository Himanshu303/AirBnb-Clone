const express = require("express");
const { postBooking, getAllBookings } = require("../controllers/booking");
const router = express.Router();

router.post("/", postBooking);
router.get("/", getAllBookings);

module.exports = router;
