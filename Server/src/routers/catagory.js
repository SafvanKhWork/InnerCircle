const express = require("express");
const Catagory = require("../models/catagory");
const auth = require("../middleware/auth");
const router = new express.Router();

//(Test: Passed )
router.post("/catagory/new", async (req, res) => {
  const catagory = new Catagory(req.body);

  try {
    await catagory.save();

    res.status(201).send(catagory);
  } catch (e) {
    res.status(400).send(e);
  }
});

//(Test: Passed )
router.get("/catagories", async (req, res) => {
  try {
    const catagories = await Catagory.find({});
    res.send(catagories);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
