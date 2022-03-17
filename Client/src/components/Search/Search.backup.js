import { useState } from "react";
import { Stack, Grid, Button, TextField } from "@mui/material";
import { Scrollbars } from "react-custom-scrollbars";

//
import ResultItem from "./ResultItem";
import products from "../../data";

const SearchBar = ({ setSearchQuery }) => (
  <form>
    <TextField
      id="user-search-bar"
      fullWidth
      className="text"
      onInput={(e) => {
        setSearchQuery(e.target.value);
      }}
      label="Recommend To"
      variant="outlined"
      placeholder=""
      size="small"
    />
  </form>
);

const finder = (isubstring, data) => {
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

export default function SearchBox(props) {
  const [searchQuery, setSearchQuery] = useState("");

  let matches = finder(searchQuery, products);
  if (searchQuery.trim() === "" && props.show) {
    matches = products;
  }
  const results = matches.map((user) => {
    return <ResultItem user={user} />;
  });

  return (
    <Stack spacing={1}>
      <SearchBar
        pb={2}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
    </Stack>
  );
}
