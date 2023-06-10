import { Quote, Image } from "../interfaces/List";
import { v4 as uuidv4 } from "uuid";

export const useListAdapter = (listQuotes: Quote[], listPic: Image[]) => {
   
   const isDataLoaded = !!listQuotes.length && !!listPic.length;
   const adaptedList = isDataLoaded && listPic.map((elem, i) => {
      return {
        quote: listQuotes[i].quote,
        pic: elem.url,
        id: uuidv4(),
        isLiked: false,
      };
    });
    return {adaptedList: adaptedList ? adaptedList: []}
  };