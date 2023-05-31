import { ReactNode } from "react";
import styles from "./Button.module.scss";
import cx from "classnames";

interface ButtonProps {
  onClick: () => void;
  className?: string;
  children: ReactNode;
}
export const Button = ({ onClick, className, children }: ButtonProps) => {
  return (
    <>
      <button onClick={onClick} className={cx(styles.main_button, className)}>
        {children}
      </button>
    </>
  );
};
