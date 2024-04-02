import PATHS from "./paths";

export const SIDEBAR_ITEMS = [
  // {
  //   id: 1,
  //   name: "Dashboard",
  //   path: PATHS.DASHBOARD,
  //   icon: "Dashboard"
  // },
  {
    id: 2,
    name: "Home",
    path: PATHS.HOME,
    icon: "Home"
  },
  {
    id: 3,
    name: "Images",
    path: PATHS.IMAGE_VIEWER,
    icon: "PhotoLibrary"
  },
  // {
  //   id: 4,
  //   name: "Show Reports",
  //   path: PATHS.SHOW_REPORT,
  //   icon: "Summarize"
  // },
  // {
  //   id: 5,
  //   name: "Image Editor",
  //   path: PATHS.IMAGE_EDITOR,
  //   icon: "ShapeLine"
  // },
  {
    id: 6,
    name: "Logout",
    path: PATHS.LOGIN,
    icon: "Logout"
  },
];


export const RESPONSE_CODES = {
  SUCCESS: 200,
  NOT_FOUND: 400,
  SUCCESS_WITHOUT_CONTENT: 201,
  FORBIDDEN: 401
}