import Grid from "@mui/material/Grid";
import { useState, Fragment, useEffect } from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

// import

import ProductCard from "./ProductCard";

const products = [
  {
    name: "test product",
    model: "TS234",
    catagory: "test Product",
    image: "https://en.wikipedia.org/wiki/File:Ham_House,_London.jpg",
    description:
      "Duis mollit anim laborum excepteur sint veniam dolore sit laborum labore ut culpa.",
    price: 290,
    quantity: 10,
    like: {
      likes: 21,
      users: [{ _id: 1 }, { _id: 2 }, { _id: 3 }],
    },
    bids: [
      {
        user: 1,
        bid: 300,
      },
      {
        user: 3,
        bid: 120,
      },
    ],
    comments: [
      {
        _id: 3,
        value:
          "Duis eu proident do consequat veniam minim commodo laboris voluptate non officia adipisicing.",
      },
      {
        _id: 1,
        value:
          "Duis eu proident do consequat veniam minim commodo laboris voluptate non officia adipisicing.",
      },
    ],
    owner: 2,
    timestamps: "12 Oct 2020",
  },
  {
    name: "test2 product",
    model: "TS634",
    catagory: "test Product",
    image: "https://en.wikipedia.org/wiki/File:Ham_House,_London.jpg",
    description:
      "Duis mollit anim laborum excepteur sint veniam dolore sit laborum labore ut culpa.",
    price: 290,
    quantity: 10,
    like: {
      likes: 21,
      users: [{ _id: 1 }, { _id: 2 }, { _id: 3 }],
    },
    bids: [
      {
        user: 1,
        bid: 300,
      },
      {
        user: 3,
        bid: 120,
      },
    ],
    comments: [
      {
        _id: 3,
        value:
          "Duis eu proident do consequat veniam minim commodo laboris voluptate non officia adipisicing.",
      },
      {
        _id: 1,
        value:
          "Duis eu proident do consequat veniam minim commodo laboris voluptate non officia adipisicing.",
      },
    ],
    owner: 1,
    timestamps: "22 Oct 2020",
  },
  {
    name: "test product",
    model: "TS234",
    catagory: "test Product",
    image: "https://en.wikipedia.org/wiki/File:Ham_House,_London.jpg",
    description:
      "Duis mollit anim laborum excepteur sint veniam dolore sit laborum labore ut culpa.",
    price: 290,
    quantity: 10,
    like: {
      likes: 21,
      users: [{ _id: 1 }, { _id: 2 }, { _id: 3 }],
    },
    bids: [
      {
        user: 1,
        bid: 300,
      },
      {
        user: 3,
        bid: 120,
      },
    ],
    comments: [
      {
        _id: 3,
        value:
          "Duis eu proident do consequat veniam minim commodo laboris voluptate non officia adipisicing.",
      },
      {
        _id: 1,
        value:
          "Duis eu proident do consequat veniam minim commodo laboris voluptate non officia adipisicing.",
      },
    ],
    owner: 2,
    timestamps: "12 Oct 2020",
  },
  {
    name: "test2 product",
    model: "TS634",
    catagory: "test Product",
    image: "https://en.wikipedia.org/wiki/File:Ham_House,_London.jpg",
    description:
      "Duis mollit anim laborum excepteur sint veniam dolore sit laborum labore ut culpa.",
    price: 290,
    quantity: 10,
    like: {
      likes: 21,
      users: [{ _id: 1 }, { _id: 2 }, { _id: 3 }],
    },
    bids: [
      {
        user: 1,
        bid: 300,
      },
      {
        user: 3,
        bid: 120,
      },
    ],
    comments: [
      {
        _id: 3,
        value:
          "Duis eu proident do consequat veniam minim commodo laboris voluptate non officia adipisicing.",
      },
      {
        _id: 1,
        value:
          "Duis eu proident do consequat veniam minim commodo laboris voluptate non officia adipisicing.",
      },
    ],
    owner: 1,
    timestamps: "22 Oct 2020",
  },
  {
    name: "test product",
    model: "TS234",
    catagory: "test Product",
    image: "https://en.wikipedia.org/wiki/File:Ham_House,_London.jpg",
    description:
      "Duis mollit anim laborum excepteur sint veniam dolore sit laborum labore ut culpa.",
    price: 290,
    quantity: 10,
    like: {
      likes: 21,
      users: [{ _id: 1 }, { _id: 2 }, { _id: 3 }],
    },
    bids: [
      {
        user: 1,
        bid: 300,
      },
      {
        user: 3,
        bid: 120,
      },
    ],
    comments: [
      {
        _id: 3,
        value:
          "Duis eu proident do consequat veniam minim commodo laboris voluptate non officia adipisicing.",
      },
      {
        _id: 1,
        value:
          "Duis eu proident do consequat veniam minim commodo laboris voluptate non officia adipisicing.",
      },
    ],
    owner: 2,
    timestamps: "12 Oct 2020",
  },
  {
    name: "test2 product",
    model: "TS634",
    catagory: "test Product",
    image: "https://en.wikipedia.org/wiki/File:Ham_House,_London.jpg",
    description:
      "Duis mollit anim laborum excepteur sint veniam dolore sit laborum labore ut culpa.",
    price: 290,
    quantity: 10,
    like: {
      likes: 21,
      users: [{ _id: 1 }, { _id: 2 }, { _id: 3 }],
    },
    bids: [
      {
        user: 1,
        bid: 300,
      },
      {
        user: 3,
        bid: 120,
      },
    ],
    comments: [
      {
        _id: 3,
        value:
          "Duis eu proident do consequat veniam minim commodo laboris voluptate non officia adipisicing.",
      },
      {
        _id: 1,
        value:
          "Duis eu proident do consequat veniam minim commodo laboris voluptate non officia adipisicing.",
      },
    ],
    owner: 1,
    timestamps: "22 Oct 2020",
  },
];

const Products = (props) => {
  const [isLandscape, setIsLandscape] = useState(
    window.matchMedia("(orientation: landscape").matches
  );
  window.addEventListener("resize", () =>
    setIsLandscape(window.matchMedia("(orientation: landscape").matches)
  );
  if (isLandscape) {
    return (
      <Grid container justifyContent="center" spacing={1}>
        {products.map((product) => {
          return (
            <Grid item lg="3" xs={3}>
              <ProductCard product={product} />
            </Grid>
          );
        })}
      </Grid>
    );
  }
  if (!isLandscape) {
    return (
      <Stack spacing={1}>
        {products.map((product) => {
          return <ProductCard product={product} />;
        })}
      </Stack>
    );
  }
};

export default Products;
