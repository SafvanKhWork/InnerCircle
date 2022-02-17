const express = require("express");
const Type = require("../models/type");
const auth = require("../middleware/auth");
const { type } = require("express/lib/response");
const router = new express.Router();

router.post("/type", auth, async (req, res) => {
  const type = new Type({
    ...req.body
  });

  try {
      Type.exists({pType : req.body.pType}, function (e, doc) {
        if (e){
            throw new Error(e);
        }
       
    });
    await type.save();
    res.status(201).send(type);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/types", async (req, res) => {
  try {
    const type = await Type.find({});
    res.send(type);
  } catch (e) {
    res.status(500).send(type);
  }
});

module.exports = router;