import styles from "@shared/styles/ProgressBar.module.scss";
type ProgressBarProps = {
  value: number;
};
export default function UvPollutionProgressBar({ value }: ProgressBarProps) {
  return (
    <div className={styles.progressBarCon}>
      <div
        className={styles.progressBarElement}
        style={{ marginLeft: `${value - 5}%` }}
      ></div>
    </div>
  );
}
