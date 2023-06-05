import styles from "./Main.module.scss";
import { useState } from "react";
import { Button } from "./components/Button/Button";
import { List } from "./components/List/List";
import { getRandomQuotes } from "../../api/getRandomQuotes";
import { getRandomPics } from "../../api/getRandomPics";
import { Quote, Image } from "../../interfaces/List";
import { quote } from "../../mocks/Quotes";
import cx from "classnames";

export const Main = () => {
  const [state, setState] = useState<Quote[] | []>(quote);
  const [pic, setPics] = useState<Image[] | []>([]);
  const [isDataLoaded, setDataLoaded] = useState(false);
  const [isCurrentDataNSFW, setIsCurrentDataNSFW] = useState(false);

  const handleClick = (isNSFW = false) => {
    getRandomQuotes().then((quotes) => setState(quotes));
    getRandomPics(isNSFW)
      .then((pics) => setPics(pics.images.slice(0, 10)))
      .then(() => {
        setIsCurrentDataNSFW(isNSFW);
        setDataLoaded(true);
      });
  };

  const handleReloadPics = () => {
    getRandomPics(isCurrentDataNSFW).then((pics) =>
      setPics(pics.images.slice(0, 10))
    );
  };

  const handleClear = () => {
    setState([]);
    setPics([]);
    setDataLoaded(false);
  };

  return (
    <div
      className={cx({
        [styles.main_container]: !isDataLoaded,
        [styles.main_container_loaded]: isDataLoaded,
      })}
    >
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
          </>
        )}
      </div>
      {!!pic.length && <List listQuotes={state} listPic={pic} />}
    </div>
  );
};
