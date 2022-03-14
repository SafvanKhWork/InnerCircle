import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import { Stack, Grid, Button } from "@mui/material";
import { Avatar } from "@mui/material";
import { Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { Scrollbars } from "react-custom-scrollbars";
import DoneIcon from "@mui/icons-material/Done";
import ResultItem from "./ResultItem";

import Users from "../../data";

const users = [
  { name: "safvan khalifa", username: "khsafvan" },
  { name: "lukman", username: "khlukman" },
  { name: "test1", username: "khtest" },
  { name: "subhan", username: "khsubhan" },

  { name: "test4", username: "4tester" },
  { name: "safvan khalifa", username: "khsafvan" },
  { name: "lukman", username: "khlukman" },
  { name: "test1", username: "khtest" },
  { name: "subhan", username: "khsubhan" },

  { name: "test4", username: "4tester" },
  { name: "safvan khalifa", username: "khsafvan" },
  { name: "lukman", username: "khlukman" },
  { name: "test1", username: "khtest" },
  { name: "subhan", username: "khsubhan" },

  { name: "test4", username: "4tester" },
  { name: "safvan khalifa", username: "khsafvan" },
  { name: "lukman", username: "khlukman" },
  { name: "test1", username: "khtest" },
  { name: "subhan", username: "khsubhan" },

  { name: "test4", username: "4tester" },
];

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

  let matches = finder(searchQuery, users);
  if (searchQuery.trim() === "" && props.show) {
    matches = users;
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
      {props.show ? (
        <Scrollbars
          style={{ height: 430 }}
          autoHide
          autoHideTimeout={0}
          autoHideDuration={200}
        >
          {results}
        </Scrollbars>
      ) : (
        results
      )}
    </Stack>
  );
}