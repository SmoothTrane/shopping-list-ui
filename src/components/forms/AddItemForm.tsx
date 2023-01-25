import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import axios from "axios";

interface AddItemForm {
  handleDrawer: () => void;
}
export default function AddItemForm({ handleDrawer }: AddItemForm) {
  const [item, setItem] = useState({ name: "", description: "", quantity: 0 });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setItem({ ...item, [event.target.name]: event.target.value });
  };
  const addItem = () => {
    axios
      .post(`https://shopping-list-api-veritone.herokuapp.com/item`, item)
      .then(function (response) {
        handleDrawer();
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <>
      <FormControl sx={{ width: "100%", gap: 2, height: "530px" }}>
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
        <Box
          sx={{
            marginLeft: "auto",
            marginTop: "auto",
            gap: 2,
            display: "flex",
          }}
        >
          <Button className="black" onClick={handleDrawer}>
            Cancel
          </Button>
          <Button
            className="veritone-button"
            variant="contained"
            onClick={addItem}
          >
            Add Task
          </Button>
        </Box>
      </FormControl>
    </>
  );
}
