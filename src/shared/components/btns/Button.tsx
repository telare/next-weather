import Image from "next/image";

type Button = {
  title?: string;
  type: "submit" | "reset" | "button" | undefined;
  image: {
    src: string;
    width: number | `${number}`;
    height: number | `${number}`;
  };
  imageSrc?: string;

  func: () => void;
  width: string | number;
  style: string;
};
export default function Button({ title, func, image, type, style }: Button) {
  return (
    <button onClick={func} type={type} className={style}>
      {image && (
        <Image
          alt="img"
          src={image.src}
          width={image.width}
          height={image.height}
        />
      )}
      {title && title}
    </button>
  );
}
