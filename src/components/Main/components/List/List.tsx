import { ListItem } from "./components/ListItem";
import { Quote, Image } from "../../../../interfaces/List";
import { useState, useEffect } from "react";
import { useListAdapter } from "../../../../hooks/useListAdapter";
import styles from "./List.module.scss";
import { adaptedItemData } from "../../../../interfaces/ListItem";
import { Grid } from "@mui/material";
import { ListItemPreview } from "./components/ListItemPreview";
import { Modal } from "../Modal/Modal";

interface ListProps {
  listQuotes: Quote[];
  listPic: Image[];
}

export const List = ({ listQuotes, listPic }: ListProps) => {
  const { adaptedList } = useListAdapter(listQuotes, listPic);
  const [state, setState] = useState(adaptedList);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState<adaptedItemData | undefined>({});

  useEffect(() => {
    setState(adaptedList);
  }, [listPic, listQuotes]);

  useEffect(() => {
    setModalData((prevState) => state.find((elem) => elem.id == prevState?.id));
  }, [state]);

  const handleModalOpen = (id: string) => {
    setIsModalOpen(true);
    // @ts-ignore
    setModalData(state.find((elem) => elem.id == id));
  };

  const handleClick = (id: string) => {
    setState((prevState) => {
      const result = prevState.map((elem) => {
        if (elem.id === id) {
          return { ...elem, isLiked: !elem.isLiked }; //...elem === копирование объекта по элементам {quote: elem.quote, pic: elem.pic, id: elem.id, isLiked: elem.isLiked}
        }
        return elem;
      });
      return result;
    });
  };

  const handleDelete = (id: string) => {
    setState((prevState) => prevState.filter((elem) => elem.id !== id));
  };

  const list = state.map((elem) => {
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
