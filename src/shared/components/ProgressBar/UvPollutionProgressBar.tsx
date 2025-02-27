import styles from "@shared/styles/ProgressBar.module.scss";
type ProgressBarProps = {
  value: number;
};
export default function UvPollutionProgressBar({ value }: ProgressBarProps) {
  return (
    <div className={styles.main__con}>
      <div
        className={styles.progress__element}
        style={{ marginLeft:`${value - 5}%` }}
      ></div>
    </div>
  );
}
