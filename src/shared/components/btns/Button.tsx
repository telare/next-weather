type Button = {
  title: string;
  type:"submit" | "reset" | "button" | undefined
  image?: React.ReactElement;
  func: () => void;
  width: string | number;
  style:string;
};
export default function Button({ title, func, image, type,style }: Button) {
  return (
    <button onClick={func} type={type} className={style}>
      {image && image}
      {title}
    </button>
  );
}
