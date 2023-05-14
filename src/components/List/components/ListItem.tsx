import styles from "./ListItem.module.scss";
// @ts-ignore
import { ReactComponent as SvgTest } from "../../../assets/filled-heart.svg";
import { useState } from "react";
import cx from "classnames";
import { Modal } from "@mui/material";

export const ListItem = ({ quote, imageSrc }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    setIsLiked((prevState) => !prevState);
  };

  const handleModalOpen = () => {
    setIsModalOpen((prevState) => !prevState);
  };

  const handleClose = () => setIsModalOpen(false);

  return (
    <>
      <div>
        <li>{quote}</li>
        <img src={imageSrc} className={styles.image}></img>
        <button onClick={handleClick}>
          <SvgTest
            className={cx(styles.svg, {
              [styles.liked]: isLiked,
              [styles.default]: !isLiked,
            })}
          />
        </button>
        <button onClick={handleModalOpen}>Open modal</button>
      </div>
      <Modal open={isModalOpen} onClose={handleClose}>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            backgroundColor: "white",
            width: "500px",
            height: "500px",
            transform: "translate(-50%, -50%)",
          }}
        >
          <span>ДЕВАЧКІ ОТКРІЛІСЬ</span>
          <button onClick={handleClose}>ДЕВАЧКИ ЗАКРОЙТЕСЬ</button>
        </div>
      </Modal>
    </>
  );
};
