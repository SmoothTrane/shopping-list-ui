import React, { useEffect, useState } from "react";
import Head from "next/head";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import axios from "axios";

import Item from "../components/Item";
import AddDrawer from "../components/drawers/AddDrawer";
import CircularProgress from "@mui/material/CircularProgress";

export default function Home() {
  const [items, setItems] = useState([]);
  const [drawer, setDrawer] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
    fetchItemsAndCloseDrawer();
  }, []);

  const fetchItemsAndCloseDrawer = () => {
    axios
      .get(`https://shopping-list-api-veritone.herokuapp.com/item`)
      .then((res) => {
        const items = res.data;
        setItems(items);
        setDrawer(false);
      });
  };

  const mappedItems = items.map((item) => {
    return (
      <>
        <Item item={item} fetchItems={fetchItemsAndCloseDrawer} />
      </>
    );
  });

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Dosis:wght@200;300;400;500;600&family=Nunito:ital,wght@0,200;0,300;0,400;0,600;1,200;1,300;1,400;1,600&display=swap"
          rel="stylesheet"
        />
      </Head>
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
            </Box>
          </>
        )}{" "}
        <AddDrawer open={drawer} handleDrawer={fetchItemsAndCloseDrawer} />
      </Box>
    </>
  );
}
