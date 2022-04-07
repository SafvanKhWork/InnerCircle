import { useEffect, useState } from "react";
import { Box, Stack, TextField, MenuItem, Button } from "@mui/material";
import axios from "axios";
import { url } from "../../../../config";
import { useSelector } from "react-redux";
import { getToken, getUser } from "../../../../store/User/userSlice";

const currencies = [
  {
    value: "INR",
    label: "₹",
    weight: 1,
  },
  {
    value: "USD",
    label: "$",
    weight: 75.86,
  },
  {
    value: "EUR",
    label: "€",
    weight: 82.75,
  },

  {
    value: "BTC",
    label: "฿",
    weight: 3290815.56,
  },
  {
    value: "JPY",
    label: "¥",
    weight: 0.61,
  },
];

const updateBid = async (amount, id, weight, token) => {
  const bids = await axios.patch(
    `${url}/bid/${id}`,
    {
      bid: amount * weight,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

const NewBid = (props) => {
  const token = useSelector(getToken);
  const [currency, setCurrency] = useState("INR");
  const [currencyWeight, setCurrencyWeight] = useState(1);
  const [bid, setBid] = useState(undefined);
  const minPrice = props.maxBid ? props.maxBid : props.product.price;

  useEffect(() => {
    currencies.forEach((curr) => {
      if (currency === curr.value) {
        setCurrencyWeight(curr.weight);
      }
    });
  }, [currency]);
  const handleChange = (event) => {
    setCurrency(event.target.value);
  };

  const handleChangeAdd = (event) => {
    setBid(event.target.value);
  };

  return (
    <Box p={1} justifyContent="center">
      <Stack
        justifyContent="center"
        alignItems="center"
        direction="row"
        spacing={1}
      >
        <div>
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
        </div>
        <div>
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
        </div>
        <div>
          <Button
            onClick={async (event) => {
              await updateBid(bid, props.product._id, currencyWeight, token);
              setBid("");
              props.update();
            }}
            size="medium"
            disabled={!bid || bid * currencyWeight <= minPrice}
            variant="text"
          >
            Bid
          </Button>
        </div>
      </Stack>
    </Box>
  );
};

export default NewBid;
