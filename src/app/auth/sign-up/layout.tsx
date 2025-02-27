import { Layout } from "@/shared/types/Layout";

export default function layout({ children }: Layout) {
  return (
      <div>{children}</div>
  );
}
