type Button = {
  title: string;
  type:"submit" | "reset" | "button" | undefined
  image?: React.ReactElement;
  func: () => void;
  width: string | number;
};
export default function Button({ title, func, image, type }: Button) {
  return (
    <button onClick={func} type={type}>
      {image && image}
      {title}
    </button>
  );
}
