const express = require("express");
const User = require("../models/user");
const Circle = require("../models/circle");
const auth = require("../middleware/auth");
const router = new express.Router();

router.get("/circle/add/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    let circle;
    const user = await User.findOne({
      _id,
    });
    (async () => {
      circle = await Produ; ///////////ct.find({}).populate("owner");
      console.log(product);
    })();

    if (!user) {
      return res.status(404).send();
    }
  } catch (e) {
    res.status(400).send(e);
  }
});
