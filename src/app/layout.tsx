import { ThemeProvider } from "@/providers/theme-provider";
import { Layout } from "@/shared/types/Layout";
import React from "react";
import "@shared/styles/global.scss";
export default function RootLayout({ children }: Layout) {
  return (
    <html lang="en">
      <body>
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
