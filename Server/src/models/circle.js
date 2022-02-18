const mongoose = require("mongoose");

const circleSchema = new mongoose.Schema({
  list: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Circle",
      },
    },
  ],
  requests: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
});

const Circle = mongoose.model("Circle", circleSchema);

module.exports = Circle;
