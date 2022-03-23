import { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import axios from "axios";
import { url } from "../../config";

import UserResultItem from "./ResultItem";
import ProductResultItem from "./ProductResultItem";

const users = [
  { name: "safvan khalifa", username: "khsafvan" },
  { name: "lukman", username: "khlukman" },
  { name: "test1", username: "khtest" },
  { name: "subhan", username: "khsubhan" },

  { name: "test4", username: "4tester" },
];
let value;
const SearchBar = ({ setLoading, setSearchQuery, search }) => (
  <TextField
    id="universal-search-bar"
    fullWidth
    value={search ? value : ""}
    className="text"
    onChange={(e) => {
      if (prev !== e.target.value) {
        setSearchQuery(e.target.value);
        value = e.target.value;
        prev = e.target.value;
        setLoading(true);
        const validTime = setTimeout(() => {
          setLoading(false);
          return () => {
            clearTimeout(validTime);
          };
        }, 1000);
      }
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
  if (!data) {
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
  if (!data) {
    return [];
  }
  const matches = data.filter((obj) => {
    if (
      obj.name.split(" ").join("").toLowerCase().includes(substring) ||
      obj.product_name.split(" ").join("").toLowerCase().includes(substring) ||
      obj.model.split(" ").join("").toLowerCase().includes(substring)
    ) {
      return true;
    } else {
      return false;
    }
  });
  return matches;
};

let prev = "";

export default function SearchBox(props) {
  let results;
  const [searchQuery, setSearchQuery] = useState("");
  if (searchQuery === "") {
    results = [];
  }
  if (searchQuery !== "") {
    const prodResults = productFinder(searchQuery, props.products).map(
      (user, i) => {
        return <ProductResultItem key={"resultProduct" + i} user={user} />;
      }
    );
    const userResults = Userfinder(searchQuery, users).map((user, i) => {
      return <UserResultItem key={"resultUser" + i} user={user} />;
    });
    results = [...userResults, ...prodResults];
  }
  useEffect(() => {
    const validat = setTimeout(() => {
      props.changeResult(results);
      return () => {
        clearTimeout(validat);
      };
    }, 1000);
  }, [results]);

  return (
    <SearchBar
      pb={2}
      setLoading={props.setLoading}
      search={props.search}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
    />
  );
}
