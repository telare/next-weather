import Button from "./Button";
import { redirect } from "next/navigation";
export default function LogOutBtn() {
  return (
    <Button
      dataCyPrefix="logOut"
      type="button"
      func={() => redirect("/auth/log-in")}
      text="Log Out"
      width={40}
    />
  );
}
