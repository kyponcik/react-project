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

interface ApiProviderProps {
  children: ReactNode;
}

const imgData: Image[] = img.images.slice(0, 10);

interface ApiContextInterface {
  pics: Image[];
  quote: Quote[];
  listQuotesLoad: () => void;
  clearList: () => void;
  listPicLoaded: (isNSFW: boolean) => void;
  listPicReload: () => void;
  data: adaptedItemData[];
  clickLike: (id: string) => void;
  deleteItem: (id: string) => void;
}

export const ApiContext = createContext<ApiContextInterface>({
  pics: imgData,
  quote,
  listQuotesLoad: () => undefined,
  clearList: () => undefined,
  listPicLoaded: (isNSFW: boolean) => undefined,
  listPicReload: () => undefined,
  data: [],
  clickLike: (id: string) => undefined,
  deleteItem: (id: string) => undefined,
});

export const useApiContext = () => {
  const context = useContext(ApiContext);
  return context;
};

export const ApiPorvider = ({ children }: ApiProviderProps) => {
  const [listQuote, setQuote] = useState(quote);
  const [listPic, setListPic] = useState<Image[]>([]);
  const { adaptedList } = useListAdapter(listQuote, listPic);
  const [isCurrentDataNSFW, setIsCurrentDataNSFW] = useState(false);
  const [state, setState] = useState(adaptedList);

  useEffect(() => {
    setState(adaptedList);
  }, [listPic, listQuote]);

  const listPicLoaded = (isNSFW: boolean) => {
    /* setListPic(imgData); */
    getRandomPics(isNSFW).then((pics) => setListPic(pics.images.slice(0, 10)));
    setIsCurrentDataNSFW(isNSFW);
  };

  const listQuotesLoad = () => {
    getRandomQuotes().then((quotes) => setQuote(quotes));
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

  const deleteItem = (id: string) => {
    setState((prevState) => prevState.filter((elem) => elem.id !== id));
  };

  const listPicReload = () => {
    getRandomPics(isCurrentDataNSFW).then((pics) =>
      setListPic(pics.images.slice(0, 10))
    );
  };

  return (
    <ApiContext.Provider
      value={{
        pics: listPic,
        quote: listQuote,
        listQuotesLoad: listQuotesLoad,
        clearList: () => {
          setQuote([]);
          setListPic([]);
        },
        listPicLoaded: listPicLoaded,
        listPicReload: listPicReload,
        data: state,
        clickLike: clickLike,
        deleteItem: deleteItem,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};
