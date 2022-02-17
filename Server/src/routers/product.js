const express = require("express");
const Product = require("../models/product");
const Type = require("../models/type");
const User = require("../models/user");
const auth = require("../middleware/auth");
const { findOne } = require("../models/product");
const router = new express.Router();

//add new product

router.post("/product", auth, async (req, res) => {
  const product = new Product({
    ...req.body,
    owner: req.user._id,
  });

  try {
    Type.exists({pType : req.body.pType}, function (e, doc) {
      if (e){
          throw new Error(e);
      }
  });
    await product.save();
    res.status(201).send(product);
  } catch (e) {
    res.status(400).send(e);
  }
});

//get all products

router.get("/products", async (req, res) => {
  try {
    const product = await Product.find({});
    res.send(product);
  } catch (e) {
    res.status(500).send();
  }
});

//get most liked products

router.get("/products/popular", async (req, res) => {
  try {
    const product = await Product.find({}).sort({likes: -1})
    res.send(product);
  } catch (e) {
    res.status(500).send();
  }
});

//get recent products

router.get("/products/recent", async (req, res) => {
  try {
    const product = await Product.find({}).sort({createdAt: -1})
    res.send(product);
  } catch (e) {
    res.status(500).send();
  }
});

//get all product with given type 

router.get("/products/:type", async (req, res) => {
  try {
    const pType = req.params.type;
    const product = await Product.find({ pType });
    res.send(product);
  } catch (e) {
    res.status(500).send();
  }
});

//Get product by given id 

router.get("/products/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const product = await Product.findOne({ _id, owner: req.user._id });

    if (!product) {
      return res.status(404).send();
    }

    res.send(product);
  } catch (e) {
    res.status(500).send();
  }
});

//Update the product with given id

router.patch("/products/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "name"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ Error: "Invalid updates!" });
  }

  try {
    const product = await Product.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!product) {
      return res.status(404).send();
    }

    updates.forEach((update) => (product[update] = req.body[update]));
    await product.save();
    res.send(product);
  } catch (e) {
    res.status(400).send(e);
  }
});

//Like
router.patch("/like/:name", auth, async(req, res) => {
  try {
    const product = await Product.findOne({
      name: req.params.name,
    });

    if (!product) {
      return res.status(404).send();
    }

    const lk = product.like;

    const ur = req.user;
  // console.log(!lk.some(el => el._id !== ur._id))
    if (lk.some(el => el._id == ur._id)) {
      throw new Error('Already Liked!')
    }
    lk.push({_id : ur._id})
    product.like = lk;
    product.likes = lk.length;
    await product.save();
    res.send(product);
  } catch (e) {
    res.status(400).send(e);
  }
})

//Comment

router.patch("/comment/:name", auth, async(req, res) => {
  try {
    const product = await Product.findOne({
      name: req.params.name,
    });

    const cm = product.comment;
    const ur = req.user;
    cm.push({
      _id : ur._id,
      name : ur.name,
      value : req.body.value
    })
      product.comment = cm;
    await product.save();
    res.send(product);
  } catch (e) {
    res.status(400).send(e);
  }
})

//View Comments

router.get("/comments/:name", async (req, res) => {
  try {
    const product = await Product.findOne({ name: req.params.name });
    res.send(product.comment);
  } catch (e) {
    res.status(500).send();
  }
});

//Delete the product with given id

router.delete("/products/:id", auth, async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!product) {
      res.status(404).send();
    }

    res.send(product);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
