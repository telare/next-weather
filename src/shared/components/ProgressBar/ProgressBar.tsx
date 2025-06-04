import styles from "@shared/styles/ProgressBar.module.scss";
type ProgressBarProps = {
  value: number;
  title: string;
};
export default function ProgressBar({ value, title }: ProgressBarProps) {
  const progressDescriptionID = "progress-bar-description";
  return (
    <div
      className={styles.progressBarCon}
      aria-label={`${title} progress bar`}
      aria-live="polite"
      role="progressbar"
      aria-describedby={progressDescriptionID}
    >
      <div
        className={styles.progressBarElement}
        id={progressDescriptionID}
        aria-valuetext={`Value now: ${value}%`}
        aria-valuemin={0} 
        aria-valuemax={100}
        aria-atomic="true"
        style={{ marginLeft: `${value - 5}%` }}
      ></div>
    </div>
  );
}
