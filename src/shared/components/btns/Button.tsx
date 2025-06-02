import Image from "next/image";

type Button = {
  title?: string;
  alt: string;
  image?: {
    src: string;
    width: number | `${number}`;
    height: number | `${number}`;
  };
  icon?: React.ReactElement;

  func?: () => void;
  width?: string | number;
  className?: string;
};
export default function Button({
  title,
  func,
  image,
  icon,
  alt,
  className,
  ...rest
}: Button & Partial<HTMLButtonElement>) {
  return (
    <button onClick={func} className={className} {...rest}>
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
