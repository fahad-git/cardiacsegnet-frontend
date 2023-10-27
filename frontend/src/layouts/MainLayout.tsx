import Sidebar from "@/components/Sidebar/Sidebar";
import TopBar from "@/components/TopBar/TopBar";
import { PropsWithChildren } from "react";

export const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <TopBar />
      <div style={{ display: "flex", height: "calc(100vh - 42px)" }}>
        <Sidebar />
        {children}
      </div>
    </div>
  );
};
