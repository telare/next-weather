import { Layout } from "@/shared/types/Layout";
import TanStackProvider from "../../providers/TanStackProvider";
import DataProvider from "@/providers/data-provider";
import GlobalStore from "@/providers/global-store";

export default function HomeLayout({ children }: Layout) {
  return (
    <div
      style={{ backgroundColor: "inherit", border: "inherit" }}
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
