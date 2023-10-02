// Dependencies
import { PropsWithChildren } from "react";

// Providers
import ThemeRegistry from "@/theme/ThemeRegistry";

export function Providers({ children }: PropsWithChildren) {
  return <ThemeRegistry>{children}</ThemeRegistry>;
}
