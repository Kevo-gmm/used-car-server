const mongoose = require("mongoose");
const schema = mongoose.Schema;
const CarSchema = new schema({
  year: {
    type: String,
    required: true,
  },
  mileage: {
    type: String,
    required: true,
  },
  fuelType: {
    type: String,
    required: true,
  },
  suspension: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  carModel: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Car", CarSchema);
