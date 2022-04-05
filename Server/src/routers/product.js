const express = require("express");
const router = new express.Router();
const path = require("path");
const { ObjectID } = require("mongodb");
const multer = require("multer");
const Product = require("../models/product");
const Catagory = require("../models/catagory");
const User = require("../models/user");
const auth = require("../middleware/auth");
const uploadDestination = path.join(__dirname + "/uploads/");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDestination);
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  },
});
console.log(uploadDestination);
const fileFilter = (req, file, cb) => {
  cb(null, file.mimetype === "image/jpeg" || file.mimetype === "image/png");
};

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 10,
  },
  fileFilter,
});

// add images to product (Test: Passed)
router.post(
  "/:id/add-image",
  auth,
  upload.single("image"),
  async (req, res) => {
    // req.params.id
    // req.file.path
    try {
      const product = await Product.findById(req.params.id);
      if (String(req.user._id) === String(product.owner)) {
        await product.images.push(req.file.path);
        await product.save();
      }

      res.status(201).send(product);
    } catch (e) {
      res.status(400).send(e);
    }
  }
);

//add new product (Test: Passed)
router.post("/product/new", auth, upload.single("image"), async (req, res) => {
  const product = new Product({
    ...req.body,
    owner: req.user._id,
    images: [req.file?.path],
  });
  try {
    Catagory.exists({ name: req.body.name }, function (e) {
      if (e) {
        throw new Error(e);
      }
    });
    await product.save();

    res.status(201).send(product);
  } catch (e) {
    console.log(e.message);
    res.status(400).send(e);
  }
});

//get all products (Test: Passed)
router.get("/products", async (req, res) => {
  try {
    const product = await Product.find({}).populate("owner");
    res.send(product);
  } catch (e) {
    res.status(500).send();
  }
});

//get most liked products (Test: Passed)
router.get("/products/popular", auth, async (req, res) => {
  try {
    const product = await Product.find({}).sort({ likes: -1 });
    res.send(product);
  } catch (e) {
    res.status(500).send();
  }
});

//get recent products (Test: Passed)
router.get("/products/recent", async (req, res) => {
  try {
    const product = await Product.find({}).sort({ createdAt: -1 });
    res.send(product);
  } catch (e) {
    res.status(500).send();
  }
});

//Recommand the Product (Test: Passed)
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
      if (String(element.product) === String(product.product_name)) {
        element.recommandedby.push(req.user.username);
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

//get all product with given type (Test: Passed)
router.get("/products/catagory/:catagory", async (req, res) => {
  try {
    const catagory = req.params.catagory;
    const product = await Product.find({ catagory });

    res.send(product);
  } catch (e) {
    res.status(500).send();
  }
});

//Get By OwnerId (Test: Passed)
router.get("/products/owner/:user", async (req, res) => {
  try {
    const _id = req.params.user;
    const products = await Product.find({});
    const prods = products.filter((el) => String(el.owner) === String(_id));
    res.send(prods);
  } catch (e) {
    res.status(500).send();
  }
});

//fetch Posts from friends (Work in Progress)
router.get("/feed", auth, async (req, res) => {
  let feed = [];

  try {
    await req.user.circle.forEach(async (friend, i) => {
      const products = await Product.find({}).populate("owner");
      const posts = await products.filter(
        (product) => product.owner.username === friend
      );
      feed.push(...posts);
      if (req.user.circle.length === i + 1) {
        res
          .status(200)
          .send([...feed].sort((a, b) => b.createdAt - a.createdAt));
      }
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).send(error.message);
  }
});

//Get Recommanded product (Test: Passed)
router.get("/recommanded", auth, async (req, res) => {
  try {
    const user = req.user;
    const recc = user.recommandation.map((item) => {
      const ob1 = {
        product: item.product,
        recommandedby: item.recommandedby,
      };
      return ob1;
    });

    res.status(200).send(recc);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

//get all product with same modal number (Test: Passed)
router.get("/products/model/:model", async (req, res) => {
  try {
    const model = req.params.model;
    const product = await Product.find({ model }).populate("owner");
    res.send(product);
  } catch (e) {
    res.status(500).send();
  }
});

// get products by id (Test: Passed)
router.get("/products/id/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const product = await Product.findOne({ _id }).populate("owner");

    if (!product) {
      return res.status(404).send();
    }

    res.send(product);
  } catch (e) {
    res.status(500).send();
  }
});

//Get product by given product_name (Test: Passed)
router.get("/products/:product", async (req, res) => {
  const product_name = req.params.product;

  try {
    const product = await Product.findOne({ product_name }).populate("owner");

    if (!product) {
      return res.status(404).send();
    }

    res.send(product);
  } catch (e) {
    res.status(500).send();
  }
});

//Update the product with given id (Test: Passed)
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

//Like the product (Test: Passed)
router.patch("/like/:id", auth, async (req, res) => {
  const _id = req.params.id;
  try {
    const product = await Product.findOne({
      _id,
    });

    if (!product) {
      return res.status(404).send();
    }

    const lk = product.like;

    const ur = req.user;
    if (lk.includes(req.user._id)) {
      throw new Error("Already Liked!");
    }
    lk.push({ _id: ur._id });
    product.like = lk;

    product.likes = lk.length;
    await product.save();
    res.send(product);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Bid on product (Test: Passed)
router.patch("/bid/:id", auth, async (req, res) => {
  const _id = req.params.id;
  let exists = false;
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
      if (String(el.user) === String(bid.user)) {
        el.bid = bid.bid;
        exists = true;
      }
    });

    if (!exists) {
      product.bids.push(bid);
    }
    console.log(product);
    await product.save();

    res.send(product);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

//Comment on product (Test: Passed)
router.patch("/comment/:product", auth, async (req, res) => {
  const _id = req.params.product;

  try {
    const product = await Product.findById(_id);

    if (!product) {
      return res.status(404).send();
    }
    const cm = product.comments;
    const ur = req.user;
    cm.push({
      user: ur.username,
      value: req.body.value,
    });
    product.comments = cm;
    await product.save();
    res.send(product);
  } catch (e) {
    res.status(400).send(e);
  }
});

//View Comments (Test: Passed)
router.get("/comments/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const product = await Product.findById(_id);
    if (!product) {
      return res.status(404).send();
    }

    res.status(200).send(product.comments);
  } catch (e) {
    res.status(500).send();
  }
});

//Item sold (Test: Passed )
router.patch("/products/sold/:id", auth, async (req, res) => {
  const _id = req.params.id;
  console.log(req.user);
  try {
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
  } catch (e) {
    res.status(400).send(e);
  }
});

//Item rented (Test: Passed )
router.patch("/products/rented/:id", auth, async (req, res) => {
  const _id = req.params.id;
  console.log(req.user);
  try {
    const product = await Product.findOne({
      _id,
    });

    const rentedBy = req.user;
    const rentedTo = await User.findOne({
      _id: req.body.rentedTo,
    });

    if (!product || !rentedTo || !rentedBy) {
      return res.status(404).send();
    }
    const duration = String(req.body.duration) * 24 * 60 * 60 * 100;
    const from = String(new Date().getTime());
    const to = String(Number(from) + Number(duration));
    rentedTo.history.push({
      act: "borrowed",
      itemID: product._id,
      description: product.description,
      name: product.name,
      value: req.body.value,
      model: product.model,
      from: from,
      to: to,
      duration: duration,
      catagory: product.catagory,
      image: product.image,
      user2: product.owner,
    });
    rentedBy.history.push({
      act: "rented",
      itemID: product._id,
      description: product.description,
      name: product.name,
      value: req.body.value,
      from: from,
      to: to,
      duration: duration,
      model: product.model,
      catagory: product.catagory,
      image: product.image,
      user2: rentedTo._id,
    });

    await rentedTo.save();
    await rentedBy.save();
    await Product.findOneAndDelete({
      _id: product._id,
    });
    res.send(rentedBy.history);
  } catch (e) {
    res.status(400).send(e);
  }
});

//Delete the product with given id (Test: Passed )
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
