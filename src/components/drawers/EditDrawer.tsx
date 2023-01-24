import FormDrawer from "./FormDrawer";
import EditItemForm from "../forms/EditItemForm";

interface EditDrawerProps {
  open: boolean;
  handleDrawer: () => void;
  itemName: string;
  desc: string;
  id: string;
  isPurchased: boolean;
  quant: number;
}
export default function EditDrawer({
  open,
  handleDrawer,
  itemName,
  desc,
  quant,
  isPurchased,
  id,
}: EditDrawerProps) {
  return (
    <FormDrawer
      title="Edit an Item"
      description="Edit your new item below"
      open={open}
      toggleDrawer={handleDrawer}
    >
      <EditItemForm
        itemName={itemName}
        desc={desc}
        quant={quant}
        isPurchased={isPurchased}
        id={id}
        onCancel={handleDrawer}
      />
    </FormDrawer>
  );
}
