import {
  ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import { quote } from "../mocks/Quotes";
import { Quote, Image } from "../interfaces/List";
import { getRandomQuotes } from "../api/getRandomQuotes";
import { getRandomPics } from "../api/getRandomPics";
import { img } from "../mocks/Images";
import { useListAdapter } from "../hooks/useListAdapter";
import { adaptedItemData } from "../interfaces/ListItem";
import { useDispatch, useSelector } from "react-redux";
import { GET_QUOTES, GET_PICS } from "../actions";

interface ApiProviderProps {
  children: ReactNode;
}

interface ApiContextInterface {
  listQuotesLoad: () => void;
  listPicLoaded: (isNSFW: boolean) => void;
  listPicReload: () => void;
  adaptedData: adaptedItemData[];
  clickLike: (id: string) => void;
}

export const ApiContext = createContext<ApiContextInterface>({
  listQuotesLoad: () => undefined,
  listPicLoaded: (isNSFW: boolean) => undefined,
  listPicReload: () => undefined,
  adaptedData: [],
  clickLike: (id: string) => undefined,
});

export const useApiContext = () => {
  const context = useContext(ApiContext);
  return context;
};

export const ApiPorvider = ({ children }: ApiProviderProps) => {
  const [listPic, setListPic] = useState<Image[]>([]);
  const { adaptedList } = useListAdapter();
  const [isCurrentDataNSFW, setIsCurrentDataNSFW] = useState(false);

  const dispatch = useDispatch();

  const listPicLoaded = (isNSFW: boolean) => {
    getRandomPics(isNSFW).then((pics) =>
      dispatch(GET_PICS(pics.images.slice(0, 10)))
    );
    setIsCurrentDataNSFW(isNSFW);
  };

  const listQuotesLoad = () => {
    getRandomQuotes().then((quotes) => dispatch(GET_QUOTES(quotes)));
  };

  const clickLike = (id: string) => {
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

  const listPicReload = () => {
    getRandomPics(isCurrentDataNSFW).then((pics) =>
      setListPic(pics.images.slice(0, 10))
    );
  };

  return (
    <ApiContext.Provider
      value={{
        listQuotesLoad: listQuotesLoad,
        listPicLoaded: listPicLoaded,
        listPicReload: listPicReload,
        adaptedData: adaptedList,
        clickLike: clickLike,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};
