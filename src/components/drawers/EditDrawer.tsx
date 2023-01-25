import React from "react";

import FormDrawer from "./FormDrawer";
import EditItemForm from "../forms/EditItemForm";

interface EditDrawerProps {
  open: boolean;
  handleDrawer: () => void;
}
export default function EditDrawer({ open, handleDrawer }: EditDrawerProps) {
  return (
    <FormDrawer
      title="Edit an Item"
      description="Edit your new item below"
      open={open}
      toggleDrawer={handleDrawer}
    >
      <EditItemForm />
    </FormDrawer>
  );
}
