const express = require("express");
const router = express.Router();
const {
  addPlaces,
  getPlaces,
  getPlace,
  putPlace,
  getAllPlaces,
} = require("../controllers/places");

router.get("/", getAllPlaces);
router.post("/", addPlaces);
router.get("/user-places", getPlaces);
router.get("/:id", getPlace);
router.put("/", putPlace);
module.exports = router;
