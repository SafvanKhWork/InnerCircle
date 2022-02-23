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
      ref: "Type",
    },
    preview: {
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
        price: {
          type: Number,
          required: true,
        },
      },
    ],
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
