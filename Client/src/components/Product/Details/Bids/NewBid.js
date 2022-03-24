import { useState } from "react";
import { Box, Stack, TextField, MenuItem, Button } from "@mui/material";
import axios from "axios";
import { url, token } from "../../../../config";

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

const updateBid = async (amount, id) => {
  const bids = await axios.patch(
    `${url}/bid/${id}`,
    {
      bid: amount,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

const NewBid = (props) => {
  const [currency, setCurrency] = useState("EUR");
  const [bid, setBid] = useState(undefined);

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };

  const handleChangeAdd = (e) => {
    setBid(e.target.value);
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
            value={bid}
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </item>
        <item>
          <Button
            onClick={async (e) => {
              await updateBid(bid, props.product._id);
              setBid("");
              props.update();
            }}
            size="medium"
            disabled={!bid || bid < 1}
            variant="text"
          >
            Bid
          </Button>
        </item>
      </Stack>
    </Box>
  );
};

export default NewBid;
