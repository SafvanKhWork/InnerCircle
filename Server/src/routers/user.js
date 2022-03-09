const express = require("express");
const gravatar = require("gravatar");
const User = require("../models/user");
const auth = require("../middleware/auth");
const router = new express.Router();
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

let otp = undefined;
let un_email = null;
let ver_email = null;
const timers = [];

//Register new user
router.post("/user/register", async (req, res) => {
  try {
    let data = req.body;

    let avatar = gravatar
      .url(data.email, {
        s: 400,
        r: "pg",
        d: "mm",
      })
      .slice(2);
    data = { ...data, avatar };
    const user = new User(data);
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});
//send otp on Email
router.post("/email", auth, async (req, res) => {
  try {
    const email = req.param.email;
    const code = [
      Math.round(Math.random() * 10) + 1,
      Math.round(Math.random() * 10) + 1,
      Math.round(Math.random() * 10) + 1,
      Math.round(Math.random() * 10) + 1,
      Math.round(Math.random() * 10) + 1,
      Math.round(Math.random() * 10) + 1,
    ].join("");

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "",
        pass: "",
      },
    });

    let mail = {
      from: "",
      to: "",
      subject: "",
      text: "",
    };
    transporter.sendMail(mail, (error, data) => {
      if (data) {
        otp = code;
        un_email = email;
      }
    });
    setTimeout(() => {
      otp = undefined;
    }, 5 * 60 * 100);
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

//match the otp
router.post("/verify", auth, async (req, res) => {
  try {
    const code = req.body.code;
    if (code === otp) {
      ver_email = un_email;
    }
    if (code !== otp) {
      otp = undefined;
    }
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

router.patch("/user/passwd", async (req, res) => {
  try {
    const new_passwd = req.body.password;
    const user = ver_email ? User.findOne({ email: ver_email }) : undefined;
    if (user && new_passwd) {
      user.password = new_passwd;
    }
    await user.save();
    res.send(req.user);
  } catch (e) {
    res.status(400).send(e);
  }
});

//Login User
router.post("/user/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

//Logout User
router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();

    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

//Hard Logout
router.post("/users/logout/all", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

//Get User Profile
router.get("/user/me", auth, async (req, res) => {
  res.send(req.user);
});

//Update User Profile
router.patch("/users/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age", "avatar"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();
    res.send(req.user);
  } catch (e) {
    res.status(400).send(e);
  }
});

//Delete User
router.delete("/users/me", auth, async (req, res) => {
  try {
    await req.user.remove();
    res.send(req.user);
  } catch (e) {
    res.status(500).send();
  }
});

//Get User by ID
router.get("/user/id/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const user = await User.findOne({ _id });
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (e) {
    res.status(500).send();
  }
});

//Add Friend
router.post("/user/:uname/add", auth, async (req, res) => {
  const username = req.params.uname;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).send();
    }
    user.friendRequest.push(req.user.username);
    user.friendRequest = [...new Set(user.friendRequest)];
    user.save();
    res.status(200).send(user);
  } catch (e) {
    res.status(500).send();
  }
});

//Get CIRCLE
router.get("/circle", auth, async (req, res) => {
  try {
    const user = req.user;
    const circle = user.circle.map((friend) => {
      const ob1 = User.findOne({ username: friend });
      return ob1;
    });

    res.status(200).send(circle);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

//Accept friendRequest
router.patch("/user/:uname/add", auth, async (req, res) => {
  const username = req.params.uname;

  try {
    const user = await User.findOne({ username });
    const atIndex = user.friendRequest.indexOf(username);
    if (!user) {
      return res.status(404).send();
    }
    user.circle.push(req.user.username);
    user.circle = [...new Set(user.circle)];

    if (atIndex !== -1) {
      user.friendRequest.splice(atIndex, 1);
    }
    user.save();
    res.status(200).send(user);
  } catch (e) {
    res.status(500).send();
  }
});

//Get User By Username
router.get("/user/:uname", async (req, res) => {
  const username = req.params.uname;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (e) {
    res.status(500).send();
  }
});

// Search by Name
router.get("/search/user/:name", async (req, res) => {
  const name = req.params.name;

  try {
    const user = await User.find({ name });
    if (user.length) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
