import link_styles from "./styles/Link.module.scss"
export default function Links() {
  return (
    <div className={link_styles.main__con}>
      <ul>
        <li>Home</li>
        <li>Favorite</li>
      </ul>
    </div>
  );
}
