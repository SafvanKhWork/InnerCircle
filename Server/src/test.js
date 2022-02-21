require("./db/mongoose");
const Product = require("./models/product");
const User = require("./models/user");
const Type = require("./models/type");
const Circle = require("./models/circle");
const Recommendation = require("./models/recommandation");

// Product.findOne({ name: "pizza" })
//   .populate("owner") // only works if we pushed refs to person.eventsAttended
//   .exec(function (err, person) {
//     if (err) return handleError(err);
//     console.log(person);
//   });
