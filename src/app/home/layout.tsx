import TanStackProvider from "../../providers/TanStackProvider";
import DataProvider from "@/providers/data-provider";
import GlobalStore from "@/providers/global-store";

export default function HomeLayout({
  children,
  searchModal,
}: {
  children: React.ReactNode;
  searchModal: React.ReactNode;
}) {
  return (
    <div style={{ backgroundColor: "inherit", border: "inherit" }}>
      <TanStackProvider>
        <GlobalStore>
          <DataProvider>
            <div>{children}{searchModal}</div>
          </DataProvider>
        </GlobalStore>
      </TanStackProvider>
    </div>
  );
}
