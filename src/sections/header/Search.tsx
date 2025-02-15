import Image from "next/image";
import search_styles from "./styles/Search.module.scss";
import { setCityName } from "@/providers/global-store";
import { useDispatch } from "react-redux";
export default function Search() {
  const dispatch = useDispatch()
  return (
    <div className={search_styles.main__con}>
      <input
        type="text"
        placeholder="Search Here..."
        onChange={(e) => dispatch(setCityName(e.target.value))}
      />
      <div className={search_styles.shortcuts__con}>
        <Image
          src="/icons/night-mode/ctrl.png"
          width={40}
          height={40}
          alt="S"
        />
        <Image
          src="/icons/night-mode/t_button.png"
          width={30}
          height={30}
          alt="t"
        />
      </div>
    </div>
  );
}
