import { useState } from "react";
import { Quote } from "../../App";
import { ListItem } from "./components/ListItem";

interface ListProps {
  listQuotes: Quote[];
}

export const List = ({ listQuotes, listPic }: ListProps) => {
  const [girls, setGirls] = useState([]);
  // const getGirls = () => {
  //   return {
  //     quote: listQuotes[0].quote,
  //     pic: listPic[0].url,
  //     id: 0,
  //     liked: false,
  //   };
  // };


  const list = listQuotes.map((elem, index) => (
    <ListItem quote={elem.quote} imageSrc={listPic[index].url} />
  ));

  return (
    <>
      <ul>{list}</ul>
    </>
  );
};
