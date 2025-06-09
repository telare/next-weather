"use client";
import Search from "@shared/components/nav/Search";
import Modal from "@shared/components/Modals/Modal";
import { useRouter } from "next/navigation";
import styles from "@shared/styles/SearchModal.module.scss";
export default function SearchModal() {
  const router = useRouter();
  return (
    <Modal onOpenChange={() => router.back()}>
      <div className={styles.search}>
        <Search />
      </div>
    </Modal>
  );
}
