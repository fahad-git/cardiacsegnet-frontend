import Sidebar from "@/components/Sidebar/Sidebar";
import NavbarLoggedIn from "@/components/Navigation/NavbarLoggedIn";
import { PropsWithChildren } from "react";

export const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <NavbarLoggedIn />
      <div
        style={{
          display: "flex",
          height: "calc(100vh - 25px)",
        }}
      >
        <Sidebar />
        <div
          style={{
            width: "100%",
            overflow: "scroll",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
