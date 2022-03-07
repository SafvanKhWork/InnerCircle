const express = require("express");

//

const userRouter = require("../src/routers/user");
const productRouter = require("../src/routers/product");
const catagoryRouter = require("../src/routers/catagory");

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
const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log("Server is up on port " + port);
});

app.use(express.json());
app.use(userRouter);
app.use(productRouter);
app.use(catagoryRouter);
