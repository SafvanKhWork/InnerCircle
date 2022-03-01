const mongoose = require("mongoose");
const User = require("./user");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    catagory: {
      type: String,
      required: true,
      trim: true,
      ref: "Catagory",
    },
    image: {
      data: Buffer,
      contentType: String,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      default: 1,
      required: true,
    },
    like: {
      users: [
        {
          _id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
          },
        },
      ],
      likes: {
        type: Number,
      },
    },
    bids: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        bid: {
          type: Number,
          required: true,
        },
      },
    ],
    comments: [{ _id: mongoose.Schema.Types.ObjectId, value: String }],
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
