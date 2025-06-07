import styles from "@shared/styles/ProgressBar.module.scss";
type ProgressBarProps = {
  value: number;
  title: string;
};
export default function ProgressBar({ value, title }: ProgressBarProps) {
  const progressValueID = title.replaceAll(" ", "-");
  return (
    <div
      className={styles.progressBarCon}
      aria-label={`${title} progress bar`}
      aria-live="polite"
      role="progressbar"
      aria-describedby={progressValueID}
      aria-valuetext={`Value now: ${value}%`}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className={styles.progressBarElement}
        id={progressValueID}
        aria-atomic="true"
        style={{ marginLeft: `${value - 5}%` }}
      ></div>
    </div>
  );
}
