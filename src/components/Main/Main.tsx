import styles from "./Main.module.scss";
import { useState } from "react";
import { Button } from "./components/Button/Button";
import { List } from "./components/List/List";
import cx from "classnames";
import { useThemeContext } from "../../context/ThemeProvider";
import { Switch, FormControlLabel } from "@mui/material";
import { useApiContext } from "../../context/ApiProvider";
import { useSelector, useDispatch } from "react-redux";
import { CLEAR_DATA } from "../../actions";

export const Main = () => {
  const [isDataLoaded, setDataLoaded] = useState(false);
  const { value, setToDark, setToLight } = useThemeContext();
  const { listQuotesLoad, listPicLoaded, listPicReload } = useApiContext();
  const isPicsLoaded = useSelector((state) => state.firstReducer.pics);
  const dispatch = useDispatch();

  const handleClick = (isNSFW = false) => {
    listQuotesLoad();
    listPicLoaded(isNSFW);
    setDataLoaded(true);
  };

  const handleClear = () => {
    dispatch(CLEAR_DATA());
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
            <Button onClick={() => listPicReload()}>Reload</Button>
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
          </>
        )}
      </div>
      {!!isPicsLoaded.length && <List />}
    </div>
  );
};
