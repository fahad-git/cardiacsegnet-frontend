// Dependencies
import { PropsWithChildren } from "react";

// Providers
import ThemeRegistry from "@/theme/ThemeRegistry";
import { AppContextProvider } from "@/handlers/context/app-context";
import { ToastContainer } from "react-toastify";

export function Providers({ children }: PropsWithChildren) {
  return (
      <AppContextProvider>
        <ThemeRegistry><ToastContainer/>{children}</ThemeRegistry>;
      </AppContextProvider>
  )
}
