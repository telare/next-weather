import DataProvider from "@/providers/dataProvider/dataProvider";
import StoreProvider from "@/providers/globalStore";
import QueryProvider from "@/providers/queryProvider";

export default function HomeLayout({
  children,
  searchModal,
}: {
  children: React.ReactNode;
  searchModal: React.ReactNode;
}) {
  return (
    <div
      style={{ backgroundColor: "inherit", border: "inherit", width: "80%" }}
    >
      <QueryProvider>
        <StoreProvider>
          {searchModal}
          <DataProvider>
            <div>{children}</div>
          </DataProvider>
        </StoreProvider>
      </QueryProvider>
    </div>
  );
}
