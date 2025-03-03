"use client";
import Search from "../../../shared/components/nav/Search";
import Modal from "../../../shared/components/Modals/Modal";
import { useRouter } from "next/navigation";
export default function SearchModal() {
  const router = useRouter();
  return (
    <Modal onOpenChange={() => router.back()}>
        <Search />
    </Modal>
  );
}
