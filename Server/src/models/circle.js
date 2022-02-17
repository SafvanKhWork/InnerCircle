const mongoose = require("mongoose");

const circleSchema = new mongoose.Schema(
  {
    list: [{ _id:{
        type: mongoose.Schema.Types.ObjectId,
      }}],
    requests: [{
        _id:{
            type: mongoose.Schema.Types.ObjectId,
          },
        username: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
        }
    }]
  },
);
circleSchema.virtual("users", {
  ref: "Circle",
  localField: "_id",
  foreignField: "circle",
});

const Circle = mongoose.model("Type", circleSchema);

module.exports = Circle;