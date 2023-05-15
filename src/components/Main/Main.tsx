import { useState } from "react";
import { Button } from "./components/Button/Button";
import { List } from "./components/List/List";
import { getRandomQuotes } from "../../api/getRandomQuotes";
import { getRandomPics } from "../../api/getRandomPics";

export const Main = () => {
  const [state, setState] = useState([]);
  const [pic, setPics] = useState([]);

  const handleClick = () => {
    getRandomQuotes().then((quotes) => setState(quotes));
    getRandomPics().then((pics) => setPics(pics.images.slice(0, 10)));
  };

  return (
    <>
      <Button onClick={handleClick} />
      <List listQuotes={state} listPic={pic} />
    </>
  );
};
