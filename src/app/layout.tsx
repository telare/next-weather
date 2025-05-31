import { ThemeProvider } from "@/providers/themeProvider";
import { Layout } from "@shared/types/Layout";
import React from "react";
import "@shared/styles/global.scss";
import { Space_Grotesk } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";

const space_grotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: "400",
});
export default function RootLayout({ children }: Layout) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="apple-mobile-web-app-title" content="NextWeather" />
        {/* <link rel="icon" href="/img/favicon.png" /> */}
      </head>
      <body className={space_grotesk.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
