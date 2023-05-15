import { ListItem } from "./components/ListItem";

export const List = ({ listQuotes, listPic }) => {
  const list = listQuotes.map((elem, index) => (
    <ListItem quote={elem.quote} imgSrc={listPic[index].url}></ListItem>
  ));

  return (
    <>
      <ul>{list}</ul>
    </>
  );
};
