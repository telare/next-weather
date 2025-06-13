import DataProvider from "@/providers/dataProvider/dataProvider";
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
      {searchModal}
      <DataProvider>{children}</DataProvider>
    </QueryProvider>
  );
}
