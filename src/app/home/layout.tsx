import { Layout } from "@/shared/types/Layout";
import { Space_Grotesk } from "next/font/google";
import TanStackProvider from "../../providers/TanStackProvider";
import DataProvider from "@/providers/data-provider";
import { Provider } from "react-redux";
import GlobalStore from "@/providers/global-store";
const space_grotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: "400",
});

export default function HomeLayout({ children }: Layout) {
  return (
    <div
      className={space_grotesk.className}
      style={{ backgroundColor: "inherit", border: "none" }}
    >
      <TanStackProvider>
        <GlobalStore>
          <DataProvider>
            <div>{children}</div>
          </DataProvider>
        </GlobalStore>
      </TanStackProvider>
    </div>
  );
}
