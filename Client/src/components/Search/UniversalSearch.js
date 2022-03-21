import { useState } from "react";
import { Stack, Grid, Button, TextField } from "@mui/material";
import { Scrollbars } from "react-custom-scrollbars";
import UserResultItem from "./ResultItem";

//
import ProductResultItem from "./ProductResultItem";
import products from "../../data";

const users = [
  { name: "safvan khalifa", username: "khsafvan" },
  { name: "lukman", username: "khlukman" },
  { name: "test1", username: "khtest" },
  { name: "subhan", username: "khsubhan" },

  { name: "test4", username: "4tester" },
];
let value;
const SearchBar = ({ setSearchQuery, search }) => (
  <TextField
    id="universal-search-bar"
    fullWidth
    value={search ? value : ""}
    className="text"
    onInput={(e) => {
      setSearchQuery(e.target.value);
      value = e.target.value;
    }}
    label="Search"
    variant="outlined"
    placeholder=""
    size="small"
  />
);

const Userfinder = (isubstring, data) => {
  const substring = isubstring.split(" ").join("").toLowerCase();
  if (!substring) {
    return [];
  }

  const matches = data.filter((obj) => {
    if (
      obj.name.split(" ").join("").toLowerCase().includes(substring) ||
      obj.username.split(" ").join("").toLowerCase().includes(substring)
    ) {
      return true;
    } else {
      return false;
    }
  });
  return matches;
};

const productFinder = (isubstring, data) => {
  const substring = isubstring.split(" ").join("").toLowerCase();
  if (!substring) {
    return [];
  }

  const matches = data.filter((obj) => {
    if (
      obj.name.split(" ").join("").toLowerCase().includes(substring)
      //  || obj.product_name.split(" ").join("").toLowerCase().includes(substring) ||
      // obj.modal.split(" ").join("").toLowerCase().includes(substring)
    ) {
      return true;
    } else {
      return false;
    }
  });
  return matches;
};

let prev;

export default function SearchBox(props) {
  const [searchQuery, setSearchQuery] = useState("");
  let matches;

  if (prev !== searchQuery) {
    if (searchQuery.trim() === "" && props.show) {
      matches = products;
    }

    const prodResults = productFinder(searchQuery, products).map((user) => {
      return <ProductResultItem user={user} />;
    });
    const userResults = productFinder(searchQuery, users).map((user) => {
      return <UserResultItem user={user} />;
    });
    const results = [...userResults, ...prodResults];
    props.searchResults(results);
  }

  prev = searchQuery;
  return (
    <SearchBar
      pb={2}
      search={props.search}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
    />
  );
}
