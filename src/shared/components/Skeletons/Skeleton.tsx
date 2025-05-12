import styles from "@shared/styles/Skeleton.module.scss";
export default function Skeleton({
  className,
  children,
}: {
  className: string;
  children?: React.ReactNode | React.ReactNode[];
}) {
  return (
    <div className={[className, styles.wrapper].join(" ")}>{children}</div>
  );
}
