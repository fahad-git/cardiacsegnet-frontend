import Sidebar from "@/components/Sidebar/Sidebar";
import { PropsWithChildren } from "react";

export const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <div>Home</div>
      {children}
    </div>
  );
};
