const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    pType: {
      type: String,
      required: true,
      trim: true,
      ref: "Type",
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },

    like: [{ _id:{
      type: mongoose.Schema.Types.ObjectId,
    } }],
    likes :{
      type: Number
    },
    comment: [
      { _id: mongoose.Schema.Types.ObjectId, name: String, value: String },
    ],
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
