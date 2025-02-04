type Button = {
  title: string;
  func: () => void;
  width: string | number;
};
export default function Button({ title, func, width }: Button) {
  return <button onClick={func}>{title}</button>;
}
