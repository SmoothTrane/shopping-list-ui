import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";

import axios from "axios";

import Garbage from "./icons/Garbage";
import Edit from "./icons/Edit";
import EditDrawer from "./EditDrawer";

export default function Item({ item, fetchItems }) {
  const [drawer, setDrawer] = useState(false);
  const [modal, setModal] = useState(false);
  const [selected, setSelected] = useState(false);

  const removeItem = () => {
    axios
      .delete(
        `https://shopping-list-api-veritone.herokuapp.com/item/${item._id}`
      )
      .then(function (response) {
        fetchItems();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleClose = () => {
    setModal(false);
  };

  const handleCheck = () => {
    setSelected(!selected);
  };

  return (
    <>
      <Box
        className={selected ? "highlighted-item" : ""}
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
            checked={selected}
            onChange={handleCheck}
          ></Checkbox>
          <Box sx={{ display: "flex", width: "100%", flexDirection: "column" }}>
            <span className={selected ? "strike highlight-text" : "highlight"}>
              {item.name}
            </span>
            <span className={selected ? "strike" : ""}>{item.description}</span>
          </Box>
          <Box
            sx={{
              marginLeft: "auto",
              gap: 2,
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Edit onClick={() => setDrawer(!drawer)}>Edit</Edit>

            <Garbage onClick={() => setModal(true)} />
          </Box>
        </Box>
        <EditDrawer
          itemName={item.name}
          desc={item.description}
          quant={4}
          open={drawer}
          handleDrawer={() => setDrawer(false)}
          fetchItems={fetchItems}
          id={item._id}
          isPurchased={item.isPurchased}
        />
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
    </>
  );
}
