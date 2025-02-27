
import { Layout } from "@/shared/types/Layout";
export default function ProfileLayout({ children }: Layout) {
  return (
      <div>
        <div>{children}</div>
      </div>
  );
}
