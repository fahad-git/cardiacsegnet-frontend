// Dependencies
import { PropsWithChildren } from "react";

// Providers
import ThemeRegistry from "@/theme/ThemeRegistry";
import { AppContextProvider } from "@/handlers/context/app-context";

export function Providers({ children }: PropsWithChildren) {
  return (
      <AppContextProvider>
        <ThemeRegistry>{children}</ThemeRegistry>;
      </AppContextProvider>
  )
}
