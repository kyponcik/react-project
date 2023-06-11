import { ListItem } from "./components/ListItem";
import { useState, useEffect } from "react";
import styles from "./List.module.scss";
import { adaptedItemData } from "../../../../interfaces/ListItem";
import { Grid } from "@mui/material";
import { ListItemPreview } from "./components/ListItemPreview";
import { Modal } from "../Modal/Modal";
import { useApiContext } from "../../../../context/ApiProvider";

export const List = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState<adaptedItemData | undefined>({});
  const { data, clickLike, deleteItem } = useApiContext();

  useEffect(() => {
    setModalData((prevState) => data.find((elem) => elem.id == prevState?.id));
  }, [data]);

  const handleModalOpen = (id: string) => {
    setIsModalOpen(true);
    setModalData(data.find((elem) => elem.id == id));
  };

  const handleClick = (id: string) => {
    clickLike(id);
  };

  const handleDelete = (id: string) => {
    deleteItem(id);
  };

  const list = data.map((elem) => {
    return (
      <ListItem
        item={elem}
        key={elem.id}
        onHeartClick={handleClick}
        onDeleteClick={handleDelete}
        onModalClick={handleModalOpen}
      />
    );
  });

  return (
    <>
      <Grid
        container
        spacing={4}
        rowSpacing={2}
        className={styles.content_container}
      >
        {list}
      </Grid>
      <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
        <ListItemPreview item={modalData} onHeartClick={handleClick} />
        <button
          onClick={() => setIsModalOpen(false)}
          className={styles.modal_close_btn}
        >
          X
        </button>
      </Modal>
    </>
  );
};
