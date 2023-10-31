// Dependencies
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";

// Types
type SidebarProps = {
  toggle?: number;
  isactive?: number;
};

export const Container = styled(Box)<SidebarProps>(({ toggle, theme }) => ({
  width: toggle === 1 ? "220px" : "50px",
  minWidth: toggle === 1 ? "220px" : "50px",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  position: "relative",
  borderRight: `1px solid var(--gray-200, ${theme.palette.common.chablis})`,
  backgroundColor: theme.palette.common.vistaWhite,
  top: 0,
  left: 0,
  bottom: 0,
}));

export const InnerContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  padding: "6px",
  display: "flex",
  flexDirection: "column",
  color: theme.palette.common.black,
}));

export const Organization = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "6px 10px 6px 6px",
  marginBottom: "6px",
}));

export const NavItem = styled(Box)<SidebarProps>(({ theme, isactive = 0 }) => ({
  display: "flex",
  padding: "8px",
  marginBottom: "6px",
  borderRadius: "6px",
  backgroundColor:
    isactive === 1 ? theme.palette.common.chablis : "transparent",
  "&:hover": {
    backgroundColor: theme.palette.common.chablis,
  },
}));

export const StyledIconButton = styled(IconButton)(() => ({
  padding: "0px",
}));

export const UserContainer = styled(Box)(() => ({
  display: "flex",
  transition: ".2s ease-in-out 0s",
  alignItems: "center",
  gap: "6px",
  "&:hover": {
    cursor: "pointer",
    transform: "scale(1.05)",
  },
}));
