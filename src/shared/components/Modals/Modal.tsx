"use client";
import styles from "@shared/styles/Portal.module.scss";

type ModalProps = {
  children: React.ReactElement;
};

export default function Modal({ children }: ModalProps) {
  return <div className={styles.main__con}>{children}</div>;
}
