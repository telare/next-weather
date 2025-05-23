import Image from "next/image";

type Button = {
  title?: string;
  alt: string;
  type: "submit" | "reset" | "button" | undefined;
  image?: {
    src: string;
    width: number | `${number}`;
    height: number | `${number}`;
  };
  icon?: React.ReactElement;

  func?: () => void;
  width?: string | number;
  style?: string;
};
export default function Button({
  title,
  func,
  image,
  icon,
  type,
  style,
  alt
}: Button) {
  return (
    <button onClick={func} type={type} className={style}>
      {image && ( 
        <Image
          alt={`${alt} button`}
          src={image.src}
          width={image.width}
          height={image.height}
        />
      )}

      {icon && icon}

      {title && title}
    </button>
  );
}
