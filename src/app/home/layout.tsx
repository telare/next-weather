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
    <QueryProvider>
      <StoreProvider>
        {searchModal}
        <DataProvider>{children}</DataProvider>
      </StoreProvider>
    </QueryProvider>
  );
}
