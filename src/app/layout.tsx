import { ThemeProvider } from "@/providers/theme-provider";
import { Layout } from "@/shared/types/Layout";
import React from "react";
import "@shared/styles/global.scss";
import { Space_Grotesk } from "next/font/google";
const space_grotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: "400",
});
export default function RootLayout({ children }: Layout) {
  return (
    <html lang="en">
      <body
        style={{
          border: "none",
          display: "flex",
          justifyContent: "center",
        }}
        className={space_grotesk.className}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
