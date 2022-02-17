const mongoose = require("mongoose");

const typeSchema = new mongoose.Schema(
  {
    pType: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
  },
);
typeSchema.virtual("products", {
  ref: "Product",
  localField: "pType",
  foreignField: "pType",
});

const Type = mongoose.model("Type", typeSchema);

module.exports = Type;
