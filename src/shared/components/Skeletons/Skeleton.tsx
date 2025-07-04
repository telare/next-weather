import styles from "@shared/styles/Skeleton.module.scss";
export default function Skeleton({
  className,
  children,
}: {
  className: string;
  children?: React.ReactNode | React.ReactNode[];
}) {
  return (
    <div
      className={[className, styles.skeletonCon].join(" ")}
      aria-label="Content is loading, wait"
      role="status"
    >
      {children}
    </div>
  );
}
