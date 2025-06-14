import { ThemeProvider } from "@/providers/themeProvider";
import { Layout } from "@shared/types/Layout";
import React from "react";
import "@shared/styles/global.scss";
import { Space_Grotesk } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import StoreProvider from "@/providers/globalStore";

const space_grotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: "400",
});
export default function RootLayout({ children }: Layout) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="apple-mobile-web-app-title" content="NextWeather" />
        <title>NextWeather</title>
        {/* <link rel="icon" href="/img/favicon.png" /> */}
      </head>
      <body className={space_grotesk.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <StoreProvider>
            {children}
            <Toaster position="top-right" />
          </StoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
