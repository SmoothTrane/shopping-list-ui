import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";

import axios from "axios";

import GarbageIcon from "./icons/GarbageIcon";
import EditIcon from "./icons/EditIcon";
import EditDrawer from "./drawers/EditDrawer";

interface Item {
  name: string;
  description: string;
  _id: string;
  quantity: number;
  isPurchased: boolean;
  fetchItemsAndCloseDrawer: () => void;
}
interface ItemProps {
  item: Item;
  fetchItems: () => void;
}

export const ItemContext = React.createContext<Item>({
  name: "item",
  description: "item desc",
  quantity: 4,
  _id: "44444",
  isPurchased: true,
  fetchItemsAndCloseDrawer: () => console.log("closed"),
});

export function Item({ item, fetchItems }: ItemProps) {
  const [drawer, setDrawer] = useState(false);
  const [modal, setModal] = useState(false);
  const removeItem = () => {
    axios
      .delete(
        `https://shopping-list-api-veritone.herokuapp.com/item/${item._id}`
      )
      .then(function (response) {
        fetchItems();
        setModal(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleClose = () => {
    setModal(false);
  };

  const handle = () => {
    fetchItems();
    setDrawer(false);
  };

  return (
    <>
      <ItemContext.Provider
        value={{
          name: item.name,
          description: item.description,
          isPurchased: item.isPurchased,
          quantity: item.quantity,
          _id: item._id,
          fetchItemsAndCloseDrawer: handle,
        }}
      >
        <Box
          className={item.isPurchased ? "highlighted-item" : ""}
          id={item._id}
          sx={{
            width: "100%",
            height: "87px",
            border: "0.5px solid #D5DFE9",
            display: "flex",
            borderRadius: "4px",
            marginBottom: "12px",
          }}
        >
          <Box sx={{ display: "flex", width: "100%", p: 3 }}>
            <Checkbox
              size="medium"
              checked={item.isPurchased}
              sx={{ cursor: "auto" }}
            ></Checkbox>
            <Box
              sx={{ display: "flex", width: "100%", flexDirection: "column" }}
            >
              <span
                className={
                  item.isPurchased ? "strike highlight-text" : "highlight"
                }
              >
                {item.name}
              </span>
              <span className={item.isPurchased ? "strike" : ""}>
                {item.description}
              </span>
            </Box>
            <Box
              sx={{
                marginLeft: "auto",
                gap: 2,
                display: "flex",
                flexDirection: "row",
              }}
            >
              <EditIcon handleClick={() => setDrawer(!drawer)} />

              <GarbageIcon handleClick={() => setModal(true)} />
            </Box>
          </Box>
          <EditDrawer open={drawer} handleDrawer={handle} />
        </Box>

        <Modal open={modal} onClose={handleClose} sx={{ outline: "none" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "white",
              position: "absolute" as "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              outline: "none",
              p: 4,
              borderRadius: "4px",
              boxShadow: "0px 4px 34px rgba(0, 0, 0, 0.5)",
            }}
          >
            <span className="highlight">Delete item?</span>
            <p>
              Are you sure you want to delete this item? This can not be undone.
            </p>

            <Box
              sx={{
                marginLeft: "auto",
                alignSelf: "flex-end",
                border: "none",
                gap: 2,
                display: "flex",
              }}
            >
              <Button className="black" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="contained" onClick={removeItem}>
                Delete
              </Button>
            </Box>
          </Box>
        </Modal>
      </ItemContext.Provider>
    </>
  );
}
