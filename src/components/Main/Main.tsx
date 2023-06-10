import styles from "./Main.module.scss";
import { useState } from "react";
import { Button } from "./components/Button/Button";
import { List } from "./components/List/List";
import cx from "classnames";
import { useThemeContext } from "../../context/ThemeProvider";
import { Switch, FormControlLabel } from "@mui/material";
import { useApiContext } from "../../context/ApiProvider";

export const Main = () => {
  const [isDataLoaded, setDataLoaded] = useState(false);
  const { value, setToDark, setToLight } = useThemeContext();
  const { listQuotesLoad, clearList, pics, listPicLoaded, listPicReload } =
    useApiContext();

  const handleClick = (isNSFW = false) => {
    listQuotesLoad();
    listPicLoaded(isNSFW);
    setDataLoaded(true);
  };

  const handleReloadPics = () => {
    listPicReload;
  };

  const handleClear = () => {
    clearList;
    setDataLoaded(false);
  };

  const handleChangeTheme = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.checked ? setToDark() : setToLight();
  };

  return (
    <div
      className={cx({
        [styles.main_container]: !isDataLoaded,
        [styles.main_container_loaded]: isDataLoaded,
        [styles.dark_theme]: value == "dark",
      })}
    >
      <FormControlLabel
        control={<Switch onChange={handleChangeTheme} />}
        label="Change Theme"
      />
      <div
        className={cx({
          [styles.main_menu]: !isDataLoaded,
          [styles.main_menu_loaded]: isDataLoaded,
        })}
      >
        {isDataLoaded ? (
          <>
            <Button onClick={() => handleClear()}>Clear</Button>
            <Button onClick={() => handleReloadPics()}>Reload</Button>
          </>
        ) : (
          <>
            <Button
              onClick={() => handleClick()}
              className={styles.main_load_btn}
            >
              Load
            </Button>
            <Button onClick={() => handleClick(true)}>Load NSFW</Button>
            <Button onClick={() => handleClick}>Load pic</Button>
          </>
        )}
      </div>
      {!!pics.length && <List />}
    </div>
  );
};
