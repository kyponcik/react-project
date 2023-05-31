import styles from "./ListItem.module.scss";
// @ts-ignore
import { ReactComponent as HeartIcon } from "../../../../../assets/heart.svg";
// @ts-ignore
import { ReactComponent as DeleteIcon } from "../../../../../assets/delete-icon.svg";
import cx from "classnames";
//todo make aliases
import { adaptedItemData } from "../../../../../interfaces/ListItem";
import { Grid, IconButton } from "@mui/material";
import { Button } from "../../Button/Button";

interface ListItemProps {
  onHeartClick: (id: string) => void;
  onDeleteClick: (id: string) => void;
  onModalClick?: (id: string) => void;
  item: adaptedItemData;
}

export const ListItem = ({
  item,
  onHeartClick,
  onDeleteClick,
  onModalClick,
}: ListItemProps) => {
  const { quote, pic, isLiked, id } = item;
  const heartIconClasses = cx(styles.heart_icon, styles.icon, {
    [styles.heart_icon_liked]: isLiked,
    [styles.heart_icon_default]: !isLiked,
  });

  return (
    <Grid item xs={5} className={styles.list_item_wrapper}>
      <div className={styles.list_item_container}>
        <div className={styles.list_item_content}>
          <div className={styles.list_item_content_quote}>
            <span>{quote}</span>
          </div>
          <img src={pic} className={styles.image}></img>
        </div>
        <div className={styles.list_item_controls}>
          <IconButton onClick={() => onHeartClick(id)}>
            <HeartIcon className={heartIconClasses} />
          </IconButton>
          <IconButton onClick={() => onDeleteClick(id)}>
            <DeleteIcon className={styles.delete_icon} />
          </IconButton>
          <Button onClick={() => onModalClick(id)}>Open Modal</Button>
        </div>
      </div>
    </Grid>
  );
};
