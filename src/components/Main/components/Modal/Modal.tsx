import { Modal as MuiModal } from "@mui/material";
import styles from "./Modal.module.scss";
import { ReactNode } from "react";

interface ModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: ReactNode;
}

export const Modal = ({
  isModalOpen,
  setIsModalOpen,
  children,
}: ModalProps) => {
  return (
    <MuiModal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <div className={styles.modal}>{children}</div>
    </MuiModal>
  );
};
