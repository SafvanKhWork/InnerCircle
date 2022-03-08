const express = require("express");
const Product = require("../models/product");
const Catagory = require("../models/catagory");
const User = require("../models/user");

const auth = require("../middleware/auth");
const { ObjectID } = require("mongodb");

const router = new express.Router();

//add new product

router.post("/product/new", auth, async (req, res) => {
  const product = new Product({
    ...req.body,
    owner: req.user._id,
  });

  try {
    Catagory.exists({ name: req.body.name }, function (e, doc) {
      if (e) {
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
    const product = await Product.find({}).sort({ likes: -1 });
    res.send(product);
  } catch (e) {
    res.status(500).send();
  }
});

//get recent products

router.get("/products/recent", async (req, res) => {
  try {
    const product = await Product.find({}).sort({ createdAt: -1 });
    res.send(product);
  } catch (e) {
    res.status(500).send();
  }
});

//Recommand the Product
router.patch("/recommand", auth, async (req, res) => {
  let visited = false;
  try {
    const product = await Product.findById(req.body.product);
    const user = await User.findById(req.body.user);

    if (!product || !user) {
      console.log(product, user);
      throw new Error("Some Thing Went Wrong!");
    }
    const recommandation = user.recommandation;

    recommandation.forEach((element) => {
      if (String(element.product) === String(product._id)) {
        element.recommandedby.push(req.user._id);
        element.recommandedby = [...new Set(element.recommandedby)];
        visited = true;
      }
    });

    if (!visited) {
      const obj = {};
      obj["product"] = product.product_name;
      obj["recommandedby"] = [];

      obj.recommandedby.push(req.user.username);
      recommandation.push(obj);
    }
    user.save();
    console.log(user);
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

//get all product with given type

router.get("/products/catagory/:catagory", async (req, res) => {
  try {
    const catagory = req.params.catagory;
    const product = await Product.find({ catagory });

    res.send(product);
  } catch (e) {
    res.status(500).send();
  }
});

//Get By OwnerId
router.get("/products/owner/:user", async (req, res) => {
  try {
    const _id = req.params.user;
    const product = await Product.find({ _id });
    res.send(product);
  } catch (e) {
    res.status(500).send();
  }
});

//Get Recommandedproduct
//Pending

//get all product with same modal number
router.get("/products/model/:model", async (req, res) => {
  try {
    const model = req.params.type;
    const product = await Product.find({ model });
    res.send(product);
  } catch (e) {
    res.status(500).send();
  }
});
// get products by id

router.get("/products/id/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const product = await Product.findOne({ _id });

    if (!product) {
      return res.status(404).send();
    }

    res.send(product);
  } catch (e) {
    res.status(500).send();
  }
});

//Get product by given product_name

router.get("/products/:product", async (req, res) => {
  const product_name = req.params.product;

  try {
    const product = await Product.findOne({ product_name });

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

//Like the product
router.patch("/like/:id", auth, async (req, res) => {
  const _id = req.params.id;
  try {
    const product = await Product.findOne({
      _id,
    });

    if (!product) {
      return res.status(404).send();
    }

    const lk = product.like.users;

    const ur = req.user;
    if (lk.includes(req.user._id)) {
      throw new Error("Already Liked!");
    }
    lk.push({ _id: ur._id });
    product.like.users = lk;
    product.like.likes = lk.length;
    await product.save();
    res.send(product);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Bid on product

router.patch("/bid/:id", auth, async (req, res) => {
  const _id = req.params.id;
  let altered = false;
  try {
    const product = await Product.findOne({
      _id,
    });

    if (!product) {
      return res.status(404).send();
    }

    const bids = product.bids;

    const bid = {
      user: req.user._id,
      bid: req.body.bid,
    };

    bids.forEach((el, index) => {
      console.log();
      if (String(el.user) === String(bid.user)) {
        el.bid = bid.bid;
        altered = true;
      }
    });
    if (!altered) {
      product.bids.push(bid);
    }

    await product.save();

    res.send(product);
  } catch (e) {
    res.status(400).send(e);
  }
});

//Comment on product

router.patch("/comment/:id", auth, async (req, res) => {
  const _id = req.params.id;
  try {
    const product = await Product.findOne({
      _id,
    });
    if (!product) {
      return res.status(404).send();
    }
    const cm = product.comment;
    const ur = req.user;
    cm.push({
      _id: ur._id,

      value: req.body.value,
    });
    product.comment = cm;
    await product.save();
    res.send(product);
  } catch (e) {
    res.status(400).send(e);
  }
});

//View Comments

router.get("/comments/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const product = await Product.findOne({ _id });
    if (!product) {
      return res.status(404).send();
    }
    res.send(product.comment);
  } catch (e) {
    res.status(500).send();
  }
});

//Item Transaction

router.patch("/products/sell/:id", auth, async (req, res) => {
  const _id = req.params.id;
  console.log(req.user);
  // try {
  const product = await Product.findOne({
    _id,
  });

  const soldBy = req.user;
  const soldTo = await User.findOne({
    _id: req.body.soldTo,
  });

  if (!product || !soldTo || !soldBy) {
    return res.status(404).send();
  }
  soldTo.history.push({
    act: "bought",
    itemID: product._id,
    description: product.description,
    name: product.name,
    value: req.body.value,
    model: product.model,
    catagory: product.catagory,
    image: product.image,
    user2: product.owner,
  });
  soldBy.history.push({
    act: "sold",
    itemID: product._id,
    description: product.description,
    name: product.name,
    value: req.body.value,
    model: product.model,
    catagory: product.catagory,
    image: product.image,
    user2: soldTo._id,
  });

  await soldTo.save();
  await soldBy.save();
  await Product.findOneAndDelete({
    _id: product._id,
  });
  res.send(soldBy.history);
  // } catch (e) {}
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
