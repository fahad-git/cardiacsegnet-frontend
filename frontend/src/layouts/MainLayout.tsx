import Sidebar from "@/components/Sidebar/Sidebar";
import TopBar from "@/components/TopBar/TopBar";
import { PropsWithChildren } from "react";

export const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <TopBar />
      <div style={{ display: "flex", height: "100vh" }}>
        <Sidebar />
        {children}
      </div>
    </div>
  );
};
