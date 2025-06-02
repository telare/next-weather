import Image from "next/image";
import { ButtonHTMLAttributes, JSX } from "react";

type Button = {
  text?: string;
  image?: {
    src: string;
    width: number | `${number}`;
    height: number | `${number}`;
    alt: string;
  };
  icon?: JSX.Element;
  ariaLabel?: string;

  func?: () => void;
  width?: string | number;
  className?: string;
};
export default function Button({
  text,
  func,
  image,
  icon,
  ariaLabel,
  className,
  ...rest
}: Button & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      onClick={func}
      className={className}
      aria-label={ariaLabel ? ariaLabel : text}
      {...rest}
    >
      {image && (
        <Image
          alt={`${image.alt} button image`}
          src={image.src}
          width={image.width}
          height={image.height}
        />
      )}

      {/* {Icon && <Icon aria-hidden="true" focusable="false" />} */}
      {icon && icon}

      {text && text}
    </button>
  );
}
