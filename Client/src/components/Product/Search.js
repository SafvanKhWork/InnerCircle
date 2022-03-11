import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import { Stack, Grid, Button } from "@mui/material";
import { Avatar } from "@mui/material";
import { Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

import Users from "../../data";

const users = [
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
  const matches = finder(searchQuery, users);
  return (
    <Stack spacing={1}>
      <SearchBar
        pb={2}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      {matches.map((user, i) => {
        return (
          <Stack
            px={2}
            py={1}
            spacing={1}
            justifyContent="left"
            alignItems="center"
            direction="row"
          >
            <Grid container justifyContent="center" alignItems="center">
              <Grid item key={`${i}3`} pl={1} pr={1}>
                {<Avatar src={Image} sx={{ width: 34, height: 34 }} />}
              </Grid>
              <Grid key={`${i}4`} item xs={true}>
                <Typography fontFamily={"sans-serif"} variant="title">
                  {user.name}
                </Typography>
                <Typography color="text.secondary" variant="body2">
                  {user.username}
                </Typography>
              </Grid>
            </Grid>
            <IconButton variant="text">
              <SendIcon sx={{ color: "primary" }} />
            </IconButton>
          </Stack>
        );
      })}
    </Stack>
  );
}
