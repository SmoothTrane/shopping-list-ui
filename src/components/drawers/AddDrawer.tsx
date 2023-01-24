import FormDrawer from "./FormDrawer";
import AddItemForm from "../forms/AddItemForm";

interface AddDrawerProps {
  open: boolean;
  handleDrawer: () => void;
}

export default function AddDrawer({ open, handleDrawer }: AddDrawerProps) {
  return (
    <FormDrawer
      title="Add an item"
      description="Add your new item below"
      open={open}
      toggleDrawer={handleDrawer}
    >
      <AddItemForm onCancel={handleDrawer} />
    </FormDrawer>
  );
}
