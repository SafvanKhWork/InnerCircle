import { useState } from "react";
import { Stack, Grid, Button, TextField } from "@mui/material";
import { Scrollbars } from "react-custom-scrollbars";
import { useSelector } from "react-redux";
import { getUser } from "../../store/User/userSlice";

//
import ResultItem from "./ResultItem";

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
  let matches = data.filter((username) =>
    username.split(" ").join("").toLowerCase().includes(substring)
  );
  if (substring === " ") {
    matches = data;
  }
  return matches;
};

export default function SearchBox(props) {
  const tempUser = useSelector(getUser);
  const users = tempUser.circle;
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
      ) : searchQuery ? (
        <Scrollbars
          style={{ height: 136 }}
          autoHide
          autoHideTimeout={0}
          autoHideDuration={200}
        >
          {results}
        </Scrollbars>
      ) : (
        ""
      )}
    </Stack>
  );
}
