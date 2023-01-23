import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import axios from "axios";
import RightMenu from "./icons/RightMenu";

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
    <Box>
      <Drawer
        open={open}
        PaperProps={{
          sx: {
            width: 560,
          },
        }}
      >
        <Box sx={{}}>
          <AppBar position="static">
            <Toolbar sx={{ backgroundColor: "#FAFAFA", color: "#5C6269" }}>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Shopping List
              </Typography>
              <RightMenu onClick={handleDrawer} />
            </Toolbar>
          </AppBar>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            height: "100%",
            flexDirection: "column",
            py: 4,
            px: 3,
            gap: 2,
          }}
        >
          <span className="highlight">Add an Item</span>
          <span>Add your new item below</span>
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
          <Box sx={{ marginLeft: "auto", alignSelf: "flex-end" }}>
            <Button className="black" onClick={handleDrawer}>
              Cancel
            </Button>
            <Button variant="contained" onClick={addItem}>
              Add Task
            </Button>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
}
