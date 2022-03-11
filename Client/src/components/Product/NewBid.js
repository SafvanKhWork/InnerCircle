import { useState } from "react";
import { Box, Stack, TextField, MenuItem, Button } from "@mui/material";

const currencies = [
  {
    value: "USD",
    label: "$",
  },
  {
    value: "EUR",
    label: "€",
  },

  {
    value: "BTC",
    label: "฿",
  },
  {
    value: "JPY",
    label: "¥",
  },
];

const NewBid = (props) => {
  const [currency, setCurrency] = useState("EUR");
  const [isEmpty, setIsEmpty] = useState(true);

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };

  const handleChangeAdd = (e) => {
    setIsEmpty(!e.target.value || e.target.value < 1);
    props.status.setAmounts((amount) => ({
      ...amount,
      ...{ [e.target.id]: e.target.value },
    }));
  };

  return (
    <Box p={1} justifyContent="center">
      <Stack
        justifyContent="center"
        alignItems="center"
        direction="row"
        spacing={1}
      >
        <item>
          <TextField
            size="small"
            select
            value={currency}
            onChange={handleChange}
            id="curr"
            label="Cur"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
          >
            {currencies.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </item>
        <item>
          <TextField
            size="small"
            maxRows="1"
            id={`amount${props.index}`}
            onChange={handleChangeAdd}
            label="Amount"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </item>
        <item>
          {isEmpty ? (
            <Button size="medium" disabled variant="text">
              Bid
            </Button>
          ) : (
            <Button size="medium" variant="text">
              Bid
            </Button>
          )}
        </item>
      </Stack>
    </Box>
  );
};

export default NewBid;
