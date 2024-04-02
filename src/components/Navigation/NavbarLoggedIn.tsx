/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
import { Box, IconButton } from "@mui/material";
import React, { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Link from "@mui/material/Link";
import PATHS from "@/utils/paths";
import colors from "@/theme/Colors";
import { useAppContext } from "@/handlers/context/app-context";
import { IAppContext, IStateUser } from "@/handlers/context/interfaces";

export function navbarLoggedIn() {

  // integrating context api
  const { state }: IAppContext = useAppContext();
  const user: IStateUser = state.user as IStateUser;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
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
        height: 65,
        bgcolor: colors.green,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: 5,
        color: colors.white,
      }}
    >
      <Box><img src="/logo.png" className="logo" alt="MIA"/> </Box>

      <Box><h2>CardiacSegNet</h2></Box>

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
          style={{"outline": "none", "border": "none"}}
        >
          <div className="user-name">{user?.name}</div>
          {/* <MenuIcon /> */}
          <img src="/avatar.png" alt="Avatar" className="avatar" />
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
            <Link href={PATHS.HOME} underline="none" color="inherit">
              Home
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
            <Link href={PATHS.LOGIN} underline="none" color="inherit">
              Log out
            </Link>
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
}

export default navbarLoggedIn;
