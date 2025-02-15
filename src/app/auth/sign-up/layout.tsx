import { Layout } from "@/shared/types/Layout";
import { Space_Grotesk } from "next/font/google";
const space_grotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: "400",
});

export default function layout({ children }: Layout) {
  return (
      <body style={{ margin: "0", border:"none" }} className={space_grotesk.className}>
        <div>{children}</div>
      </body>
  );
}
