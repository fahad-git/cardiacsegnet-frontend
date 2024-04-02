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
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import HomeIcon from '@mui/icons-material/Home';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import SummarizeIcon from '@mui/icons-material/Summarize';
import LogoutIcon from '@mui/icons-material/Logout';
import ShapeLineIcon from '@mui/icons-material/ShapeLine';

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
    window.location.href = redirectionPath;
  }

  const renderIcon = (iconName: string) =>{
    switch(iconName){
      case 'Home':
        return <HomeIcon />
      case 'PhotoLibrary':
        return <PhotoLibraryIcon />
      case 'Summarize':
        return <SummarizeIcon />
      case 'ShapeLine':
        return <ShapeLineIcon />
      case 'Logout':
        return <LogoutIcon />
      default:
        return <MedicalServicesIcon />
    }
  } 

  return (
    <Container toggle={1}>
      <InnerContainer>
        <Organization>
          {true && (
            <StyledIconButton
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
            >
              {true && (
                <Typography
                  sx={{
                    marginLeft: "14px",
                    ...theme.typography.body2,
                    fontWeight: 500,
                  }}
                >
                  {renderIcon(item.icon || "")}
                  &nbsp;
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
