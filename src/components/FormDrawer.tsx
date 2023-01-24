import { ReactNode } from "react";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import RightMenu from "./icons/RightMenu";
import Typography from "@mui/material/Typography";

interface FormDrawerProps {
  open: boolean;
  title: string;
  description: string;
  children?: ReactNode;
  toggleDrawer: () => void;
  action: string;
  actionFunction: () => void;
}

export default function FormDrawer({
  open,
  title,
  description,
  children,
  toggleDrawer,
  action,
  actionFunction,
}: FormDrawerProps) {
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
              <RightMenu handleClick={toggleDrawer} />
            </Toolbar>
          </AppBar>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            height: "100%",
            flexDirection: "column",
            p: 3,
            gap: 2,
          }}
        >
          <span className="highlight">{title}</span>
          <span>{description}</span>

          {children}

          <Box sx={{ marginLeft: "auto", alignSelf: "flex-end" }}>
            <Button className="black" onClick={toggleDrawer}>
              Cancel
            </Button>
            <Button variant="contained" onClick={actionFunction}>
              {action}
            </Button>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
}
