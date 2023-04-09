const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const carRoute = require("./routes/cars");

const cors = require("cors");
const app = express();

app.use(bodyParser.json()); //application/json

app.use(cors());

app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = err.message;
  res.status(status).json({ message: message, data: data });
  next();
});

app.use("/car", carRoute);

mongoose
  .connect("mongodb+srv://Admin:Cs4FDFImxZFM7dpr@cluster0.z9crejl.mongodb.net/carDealer")
  .then((results) => {
    app.listen(3000);
    console.log("listening at port 3000.....");
  })
  .catch((err) => {
    console.log(err);
  });
