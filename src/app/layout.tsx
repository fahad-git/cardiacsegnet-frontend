/* eslint-disable @next/next/no-css-tags */
// Dependencies
import type { Metadata } from "next";

// Providers
import { Providers } from "@/layouts/Providers";

// Styles
import "./globals.css";

export const metadata: Metadata = {
  title: "Image Analytics",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link href="//netdna.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
