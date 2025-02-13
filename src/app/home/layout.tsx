import { Layout } from "@/shared/types/Layout";
import { QueryClientProvider } from "@tanstack/react-query";
import { Space_Grotesk } from "next/font/google";
import queryClient from "../../providers/TanStackProvider";
const space_grotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: "400",
});

export default function HomeLayout({ children }: Layout) {
  return (
    <html lang="en">
      {/* <meta http-equiv="Secure-Content-Policy"/> */}

      <body
        className={space_grotesk.className}
        style={{ backgroundColor: "inherit", border: "none" }}
      >
        <QueryClientProvider client={queryClient}>
          <div>{children}</div>
        </QueryClientProvider>
      </body>
    </html>
  );
}
