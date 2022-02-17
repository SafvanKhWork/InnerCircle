const mongoose = require("mongoose");

const recommandationSchema = new mongoose.Schema(
    {
        list: [{
          //panding
        }],
      }
);
recommandationSchema.virtual("products", {
  ref: "Recommandation",
  localField: "_id",
  foreignField: "recommandation",
});

const Type = mongoose.model("Type", recommandationSchema);

module.exports = Type;