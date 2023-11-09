"use client";
// Dependencies
import { useTheme } from "@mui/material/styles";
// import { Dispatch, SetStateAction } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

// Providers
// import { useTabsContext } from "@/layouts/TabsProvider"
// import { useToggleContext } from "@/layouts/ToggleProvider";

// Components
// import { Logo, UpDownArrow, ArrowLeft } from "../Icons"
// import OrganizationLogo from "../OrganizationLogo"

// Utils
import { SIDEBAR_ITEMS } from "../../utils/constants";

// Styles
import {
  Container,
  InnerContainer,
  Organization,
  StyledIconButton,
  NavItem,
} from "./Style";

// interface Props {
//   toggle: boolean;
//   setToggle: Dispatch<SetStateAction<boolean>>;
// }
// { toggle, setToggle }: Props
const Sidebar = () => {
  const theme = useTheme();
  //   const { onAdd, setVal, findTab } = useTabsContext();
  //   const [activeItem, setActiveItem] = useState(0);

  //   const { adminSettings, setAdminSettings } =
  //     useToggleContext();

  //   const handleNavItem = (index: number, name: string) => {
  //     setActiveItem(index);
  //     if (name === "Admin") {
  //       setAdminSettings(!adminSettings);
  //     }
  //   };

  const onItemClick = (redirectionPath: string) => {
    window.location.href = "/" + redirectionPath;
  }

  return (
    <Container toggle={1}>
      <InnerContainer>
        <Organization>
          {/* <Box sx={{ display: "flex", alignItems: "center" }}>
            <StyledIconButton sx={{ marginLeft: "-6px" }}>
              <Logo width="36" height="36" />
            </StyledIconButton>
            {true && (
              <Typography
                sx={{
                  marginLeft: "5px",
                  ...theme.typography.body1,
                  fontWeight: 900,
                  color: theme.palette.common.black,
                }}
              >
                Medical Image Analytics
              </Typography>
            )}
          </Box> */}
          {true && (
            <StyledIconButton
            // onClick={() => setToggle(!toggle)}
            >
              {/* <ArrowLeft /> */}
            </StyledIconButton>
          )}
        </Organization>

        {SIDEBAR_ITEMS.map((item, index) => (
          <Box
            sx={{ cursor: "pointer" }}
            key={index}
            onClick={() => onItemClick(item.path)}
          >
            <NavItem
            //   onClick={() => handleNavItem(index, item.name)}
            //   isactive={index === activeItem ? 1 : 0}
            >
              {/* {item.icon({ isActiveTab: index === activeItem ? true : false })} */}
              {true && (
                <Typography
                  sx={{
                    marginLeft: "14px",
                    ...theme.typography.body2,
                    fontWeight: 500,
                  }}
                >
                  {item.name}
                </Typography>
              )}
            </NavItem>
          </Box>
        ))}
      </InnerContainer>
    </Container>
  );
};

export default Sidebar;
