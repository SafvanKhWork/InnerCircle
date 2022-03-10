import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import { Stack } from "@mui/material";
import { Avatar } from "@mui/material";
import { Typography } from "@mui/material";

const SearchBar = ({ setSearchQuery }) => (
  <form>
    <TextField
      id="search-bar"
      fullWidth
      className="text"
      onInput={(e) => {
        setSearchQuery(e.target.value);
      }}
      label="Enter a city name"
      variant="outlined"
      placeholder=""
      size="small"
    />
    <IconButton type="submit" aria-label="search">
      <SearchIcon style={{ fill: "blue" }} />
    </IconButton>
  </form>
);

const finder = (substring, data) => {
  const matches = data.filter((obj) => {
    if (obj.name.includes(substring) || obj.username.includes(substring)) {
      return true;
    } else {
      return false;
    }
  });
  return matches;
};

export default function SearchBox(props) {
  const [searchQuery, setSearchQuery] = useState("");
  const matches = finder(searchQuery, props.users);
  return (
    <Stack spacing={1}>
      <SearchBar
        pb={2}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      {matches.map((user) => {
        return (
          <Stack
            px={2}
            py={1}
            spacing={1}
            justifyContent="left"
            alignItems="center"
            direction="row"
          >
            <Avatar src={Image} sx={{ width: 24, height: 24 }} />
            <Typography variant="h6">{user.name}</Typography>
            <Typography variant="subtitle2">{user.name}</Typography>
          </Stack>
        );
      })}
    </Stack>
  );
}
