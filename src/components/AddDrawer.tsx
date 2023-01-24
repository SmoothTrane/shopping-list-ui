import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import FormDrawer from "./FormDrawer";

interface AddDrawerProps {
  open: boolean;
  handleDrawer: () => void;
  fetchItems: () => void;
}

export default function AddDrawer({
  open,
  handleDrawer,
  fetchItems,
}: AddDrawerProps) {
  const [item, setItem] = useState({ name: "", description: "", quantity: 0 });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setItem({ ...item, [event.target.name]: event.target.value });
  };

  const addItem = () => {
    axios
      .post(`https://shopping-list-api-veritone.herokuapp.com/item`, item)
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
      title="Add an item"
      description="Add your new item below"
      open={open}
      toggleDrawer={handleDrawer}
      action="Add task"
      actionFunction={addItem}
    >
      <FormControl sx={{ width: "100%", height: "100%", gap: 2 }}>
        <TextField
          id="item-name"
          label="Item Name"
          variant="outlined"
          name="name"
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
      </FormControl>
    </FormDrawer>
  );
}
