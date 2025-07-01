import { Layout } from "@/shared/types/Layout";
import { Provider } from "react-redux";
import { globalStore } from "./dataProvider/globalStore/globalStore";

export default function StoreProvider({ children }: Layout) {
  return <Provider store={globalStore}>{children}</Provider>;
}
