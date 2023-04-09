const express = require("express");

const carControllers = require("../controllers/car");

const router = express.Router();

router.get("/cars", carControllers.getCars);

router.get("/car/:carId", carControllers.getCar);

router.post("/create", carControllers.createCar);

router.post("/search", carControllers.searchCar);

router.post("/car/:carId", carControllers.updateCar);

router.delete("/car/:carId", carControllers.deleteCar);

module.exports = router;
