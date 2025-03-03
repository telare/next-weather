"use client";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
} from "@/components/ui/dialog";
import { Layout } from "@/shared/types/Layout";
import styles from "@shared/styles/Modal.module.scss";

type ModalProps = {
  onOpenChange: () => void;
};

export default function Modal({ children, onOpenChange }: Layout & ModalProps) {
  return (
    <Dialog defaultOpen={true} modal={true} onOpenChange={onOpenChange}>
      <DialogOverlay>
        <DialogContent className={styles.main__con}>{children}</DialogContent>
      </DialogOverlay>
    </Dialog>
  );
}
