"use client";

// Dependencies
import { Mulish } from "next/font/google";
import { PropsWithChildren } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeOptions, ThemeProvider } from "@mui/material/styles";

// EmmotionCache
import { NextAppDirEmotionCacheProvider } from "./EmotionCache";

// Colors
import colors from "./Colors";

const mulish = Mulish({
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

declare module "@mui/material/styles" {
  interface CommonColors {
    chablis: string;
    isabelline: string;
  }
}

const typographyOptions = {
  fontFamily: mulish.style.fontFamily,
  h1: {
    fontFamily: mulish.style.fontFamily,
    fontSize: 30,
    fontWeight: 600,
  },
  body1: {
    fontFamily: mulish.style.fontFamily,
    fontSize: 16,
    fontWeight: 400,
  },
  body2: {
    fontFamily: mulish.style.fontFamily,
    fontSize: 14,
    fontWeight: 400,
  },
};

const themeOptions: ThemeOptions = {
  typography: typographyOptions,
  palette: {
    background: {
      default: "#ffffff",
    },
    primary: {
      main: "#1976d2",
    },
    text: {
      primary: "#000000",
    },
    common: {
      chablis: colors.chablis,
      isabelline: colors.isabelline,
    },
  },
};

const theme = createTheme(themeOptions);

export default function ThemeRegistry({ children }: PropsWithChildren) {
  return (
    <NextAppDirEmotionCacheProvider options={{ key: "mui" }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </NextAppDirEmotionCacheProvider>
  );
}
