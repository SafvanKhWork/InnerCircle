require("./db/mongoose");
const Product = require("./models/product");
const User = require("./models/user");
const Type = require("./models/type");
const Circle = require("./models/circle");
const Recommendation = require("./models/recommandation");

// const user1 = new User({
//   name: "zack wolves",
//   email: "zack111w@jungle.com",
//   username: "zackwo77lves",
//   password: "wolves221",
// });

// const product1 = new Product({
//   name: "Corn Pizza",
//   catagory: "food",
//   description: "Bread, Cheese & Toppings",
//   price: 250,
//   like: {
//     users: [
//       {
//         _id: user1,
//       },
//     ],
//     likes: 1,
//   },
//   bids: [
//     {
//       user: user1,
//       price: 300,
//     },
//   ],
//   comment: [
//     {
//       _id: user1,
//       name: "zack",
//       value: "Tasty",
//     },
//   ],
//   owner: user1,
// });

// user1.save();
// product1.save();
(async () => {
  const product = await Product.find({}).populate("owner");
  console.log(product);
})();
