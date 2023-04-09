const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const Car = require("../models/car");

exports.getCars = async (req, res, next) => {
  try {
    const cars = await Car.find().sort();
    res.status(200).json({
      message: "Successfully fetched posts",
      car: cars,
    });
  } catch (err) {
    if (!err.statuCode) err.statuCode = 500;
    next(err);
  }
};
exports.createCar = async (req, res, next) => {
  try {
    const { year, mileage, fuelType, suspension, price, carModel } = req.body;

    const postExist = await Car.findOne({ carModel: carModel }).exec();
    if (postExist) {
      return res.status(201).json({
        message: "Car model already exists",
      });
    }
    const post = new Car({ year, mileage, fuelType, suspension, price, carModel });
    await post.save();
    res.status(201).json({
      message: "Post created successfully",
    });
  } catch (err) {
    if (!err.statusCode) err.statuCode = 500;
    next(err);
  }
};

exports.getCar = async (req, res, next) => {
  const carId = req.params.carId;
  const id = mongoose.Types.ObjectId(carId);
  try {
    const car = await Car.findById(id);

    if (!car) {
      const error = new Error("No car was found with given id ");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ message: "successfully fetched the car", car: car });
  } catch (err) {
    if (!err.statusCode) err.statuCode = 500;
    next(err);
  }
};
exports.searchCar = async (req, res, next) => {
  try {
    const search = req.body.search;
    const car = await Car.find({
      $or: [{ carModel: search }, { price: search }],
    });
    if (car.length > 0) {
      res.status(200).json({ status: "ok", message: "Found car", car: car });
    } else {
      res.status(200).json({ message: "no car was Found" });
    }
  } catch (err) {
    if (!err.statusCode) err.statuCode = 500;
    next(err);
  }
};

exports.updateCar = async (req, res, next) => {
  const { year, mileage, fuelType, suspension, price, carModel, carId } = req.body;
  try {
    const car = await Car.findByIdAndUpdate(
      carId,
      {
        year: year,
        mileage: mileage,
        fuelType: fuelType,
        suspension: suspension,
        price: price,
        carModel: carModel,
      },
      { new: true }
    );

    if (!car) {
      res.status(200).json({ message: "no car was Found" });
      const error = new Error("No Car was found. Please create one");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({ message: "successfully updated the car", car: car });
  } catch (err) {
    if (!err.statusCode) err.statuCode = 500;
    next(err);
  }
};

exports.deleteCar = async (req, res, next) => {
  const carId = req.params.carId;
  try {
    const car = await Car.findByIdAndRemove(carId);
    if (!car) {
      res.status(404).json({ message: "no car was Found" });
      const error = new Error("No cars were found");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ message: "successfully deleted " });
  } catch (err) {
    if (!err.statusCode) err.statuCode = 500;
    next(err);
  }
};
