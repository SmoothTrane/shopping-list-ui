import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import axios from "axios";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { ItemContext } from "../Item";

export default function EditItemForm() {
  const [item, setItem] = useState({
    name: "",
    description: "",
    quantity: 0,
    id: "",
    isPurchased: false,
  });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setItem({ ...item, [event.target.name]: event.target.value });
  };
  const handleCheck = (event: any) => {
    setItem({ ...item, isPurchased: event.target.checked });
  };
  const itemContext = React.useContext(ItemContext);

  useEffect(() => {
    setItem({
      name: itemContext.name,
      description: itemContext.description,
      quantity: itemContext.quantity,
      id: itemContext._id,
      isPurchased: itemContext.isPurchased,
    });
  }, []);
  const editItem = () => {
    axios
      .put(`https://shopping-list-api-veritone.herokuapp.com/item`, item)
      .then(function (response) {
        itemContext.fetchItemsAndCloseDrawer();
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <FormControl
      sx={{
        width: "100%",
        height: "530px",
        gap: 2,
        color: "#87898c",
        fontWeight: "100",
      }}
    >
      <TextField
        id="item-name"
        label="Item Name"
        variant="outlined"
        name="name"
        value={item.name}
        onChange={handleChange}
      />
      <TextField
        id="desc"
        label="Description"
        name="description"
        variant="outlined"
        fullWidth
        multiline
        rows={5}
        maxRows={7}
        value={item.description}
        onChange={handleChange}
      />
      <TextField
        onChange={handleChange}
        name="quantity"
        label="How many?"
        value={item.quantity}
        placeholder="How many?"
        select
      >
        <MenuItem value={1}>1</MenuItem>
        <MenuItem value={2}>2</MenuItem>
        <MenuItem value={3}>3</MenuItem>
      </TextField>
      <FormGroup>
        <FormControlLabel
          control={<Checkbox checked={item.isPurchased} />}
          label="Purchased"
          onChange={handleCheck}
        />
      </FormGroup>{" "}
      <Box
        sx={{ marginLeft: "auto", marginTop: "auto", display: "flex", gap: 2 }}
      >
        <Button
          className="black"
          onClick={itemContext.fetchItemsAndCloseDrawer}
        >
          Cancel
        </Button>
        <Button
          className="veritone-button"
          variant="contained"
          onClick={editItem}
        >
          Save Item
        </Button>
      </Box>
    </FormControl>
  );
}
