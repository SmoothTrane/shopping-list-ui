import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export default function Header() {
  return (
    <>
      {" "}
      <Box>
        <AppBar position="static">
          <Toolbar sx={{ fontFamily: "Dosis", backgroundColor: "#4D81B7" }}>
            <h1 className="title">Shopping List</h1>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}
