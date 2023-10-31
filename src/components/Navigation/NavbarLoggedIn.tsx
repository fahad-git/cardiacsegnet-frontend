import { Box, Button, IconButton } from "@mui/material";
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Link from "@mui/material/Link";

export function navbarLoggedIn() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: 60,
        bgcolor: "#EAE1E1",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box>Medical Image Analytics</Box>

      <Box
        sx={{
          justifyContent: "flex-end",
        }}
      >
        <IconButton
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <MenuIcon />
        </IconButton>

        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem>
            {" "}
            <Link href="/" underline="none" color="inherit">
              Dashboard
            </Link>
          </MenuItem>
          <MenuItem>
            {" "}
            <Link href="/addPairs" underline="none" color="inherit">
              Add image
            </Link>
          </MenuItem>
          <MenuItem>
            {" "}
            <Link href="/imageDetails" underline="none" color="inherit">
              Image details
            </Link>
          </MenuItem>
          <MenuItem onClick={handleClose} href="/">
            Profile
          </MenuItem>
          <MenuItem>
            {" "}
            <Link href="/login" underline="none" color="inherit">
              Log out
            </Link>
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
}

export default navbarLoggedIn;
