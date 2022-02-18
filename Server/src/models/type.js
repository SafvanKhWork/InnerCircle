const mongoose = require("mongoose");

const typeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
});
typeSchema.virtual("products", {
  ref: "Product",
  localField: "name",
  foreignField: "catagory",
});

const Type = mongoose.model("Type", typeSchema);

module.exports = Type;
