const express = require("express");

//

require("./db/mongoose");

//
const Product = require("./models/product");
const User = require("./models/user");
const Catagory = require("./models/catagory");
const Circle = require("./models/circle");
const Recommendation = require("./models/recommandation");

//

const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Server is up on port " + port);
});

app.use(express.json());
