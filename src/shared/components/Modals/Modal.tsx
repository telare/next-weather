"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import { Layout } from "@shared/types/Layout";
import styles from "@shared/styles/Modal.module.scss";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import Button from "../btns/Button";
import { closeIcon } from "@/utils/Icons";

type ModalProps = {
  onOpenChange: () => void;
};

export default function Modal({ children, onOpenChange }: Layout & ModalProps) {
  return (
    <Dialog defaultOpen={true} modal={true} onOpenChange={onOpenChange}>
      <DialogOverlay>
        <DialogContent className={styles.modalCon}>
          <VisuallyHidden>
            <DialogTitle></DialogTitle>
            <DialogDescription />
          </VisuallyHidden>
          {children}
            <Button
              type="button"
              alt="Close modal"
              icon={closeIcon}
              func={onOpenChange}
              style={styles.closeBtn}
            />
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
}
