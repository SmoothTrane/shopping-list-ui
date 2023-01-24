import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import axios from "axios";

import FormDrawer from "./FormDrawer";

interface EditDrawerProps {
  open: boolean;
  handleDrawer: () => void;
  fetchItems: () => void;
  itemName: string;
  desc: string;
  id: string;
  isPurchased: boolean;
  quant: number;
}
export default function EditDrawer({
  open,
  handleDrawer,
  fetchItems,
  itemName,
  desc,
  quant,
  isPurchased,
  id,
}: EditDrawerProps) {
  const [item, setItem] = useState({
    name: itemName,
    description: desc,
    quantity: quant,
    id: id,
    isPurchased: isPurchased,
  });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setItem({ ...item, [event.target.name]: event.target.value });
  };
  const handleCheck = (event: any) => {
    setItem({ ...item, isPurchased: event.target.checked });
  };

  const editItem = () => {
    axios
      .put(`https://shopping-list-api-veritone.herokuapp.com/item`, item)
      .then(function (response) {
        handleDrawer();
        fetchItems();
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <FormDrawer
      title="Edit an Item"
      description="Edit your new item below"
      open={open}
      toggleDrawer={handleDrawer}
      action="Edit Task"
      actionFunction={editItem}
    >
      <FormControl sx={{ width: "100%", height: "100%", gap: 2 }}>
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
      </FormControl>
    </FormDrawer>
  );
}
