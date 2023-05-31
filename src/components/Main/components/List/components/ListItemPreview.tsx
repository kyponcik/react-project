import styles from "./ListItemPreview.module.scss";
// @ts-ignore
import { ReactComponent as HeartIcon } from "../../../../../assets/heart.svg";
import cx from "classnames";
//todo make aliases
import { adaptedItemData } from "../../../../../interfaces/ListItem";
import { Grid, IconButton } from "@mui/material";

interface ListItemPreviewProps {
  onHeartClick: (id: string) => void;
  item: adaptedItemData;
}

export const ListItemPreview = ({
  item,
  onHeartClick,
}: ListItemPreviewProps) => {
  const { quote, pic, isLiked, id } = item;
  const heartIconClasses = cx(styles.heart_icon, styles.icon, {
    [styles.heart_icon_liked]: isLiked,
    [styles.heart_icon_default]: !isLiked,
  });

  return (
    <Grid item xs={5}>
      <div className={styles.item_preview_wrapper}>
        <div className={styles.item_preview_content}>
          <div>
            <span>{quote}</span>
          </div>
          <img src={pic} className={styles.image}></img>
        </div>
        <div>
          <IconButton
            onClick={() => {
              onHeartClick(id);
            }}
          >
            <HeartIcon className={heartIconClasses} />
          </IconButton>
        </div>
      </div>
    </Grid>
  );
};
