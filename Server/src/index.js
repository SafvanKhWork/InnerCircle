const express = require("express");
const multer = require("multer");
const path = require("path");

//

require("./db/mongoose");

//

const userRouter = require("./routers/user");
const productRouter = require("./routers/product");
const typeRouter = require("./routers/type");
const circleRouter = require("./routers/circle");
const recommandationRouter = require("./routers/recommendation");

//
const Product = require("./models/product");
const User = require("./models/user");
const Type = require("./models/type");
const Circle = require("./models/circle");
const Recommendation = require("./models/recommandation");

//

const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Server is up on port " + port);
});

app.use(express.json());

//

// app.use(userRouter);
// app.use(productRouter);
// app.use(typeRouter);
// app.use(circleRouter);
// app.use(recommandationRouter);
