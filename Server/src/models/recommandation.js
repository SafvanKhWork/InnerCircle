const mongoose = require("mongoose");

const recommandationSchema = new mongoose.Schema({
  list: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Product",
      },
      recommandedby: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
    },
  ],
});

const Type = mongoose.model("Recommandation", recommandationSchema);

module.exports = Type;
