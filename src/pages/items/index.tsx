import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import axios from "axios";

import Item from "../../components/Item";
import AddDrawer from "../../components/drawers/AddDrawer";
import CircularProgress from "@mui/material/CircularProgress";

export default function Home() {
  const [items, setItems] = useState([]);
  const [drawer, setDrawer] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
    axios
      .get(`https://shopping-list-api-veritone.herokuapp.com/item`)
      .then((res) => {
        const items = res.data;
        setItems(items);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const fetchItems = () => {
    axios
      .get(`https://shopping-list-api-veritone.herokuapp.com/item`)
      .then((res) => {
        const items = res.data;
        setItems(items);
        setDrawer(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const mappedItems = items.map((item) => {
    return (
      <>
        <Item item={item} fetchItems={fetchItems} />
      </>
    );
  });

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        py: 3,
      }}
    >
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      ) : items.length === 0 ? (
        <>
          {" "}
          <Box
            sx={{
              width: "100%",
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: 614,
                height: 290,
                border: "1px solid #C6C6C6",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "5px",
                textAlign: "center",
              }}
            >
              <Box>
                <p>{"Your shopping list is empty :("} </p>
                <Button
                  style={{ textTransform: "none" }}
                  variant="contained"
                  onClick={() => setDrawer(!drawer)}
                >
                  Add your first item
                </Button>
              </Box>
            </Box>
            <AddDrawer
              open={drawer}
              handleDrawer={() => setDrawer(false)}
              fetchItems={fetchItems}
            />
          </Box>
        </>
      ) : (
        <>
          {" "}
          <Box sx={{ display: "flex", p: 5, flexDirection: "column" }}>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <h1>Your Items</h1>
              <Button
                style={{
                  textTransform: "none",
                  marginLeft: "auto",
                  height: "36px",
                }}
                variant="contained"
                onClick={() => setDrawer(!drawer)}
              >
                Add Item
              </Button>
            </Box>

            {mappedItems}
            <AddDrawer
              open={drawer}
              handleDrawer={() => setDrawer(false)}
              fetchItems={fetchItems}
            />
          </Box>
        </>
      )}
    </Box>
  );
}
