import { ReactNode, createContext, useContext, useState } from "react";
import { quote } from "../mocks/Quotes";
import { Quote, Image } from "../interfaces/List";
import { getRandomQuotes } from "../api/getRandomQuotes";
import { getRandomPics } from "../api/getRandomPics";
import { img } from "../mocks/Images";

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
  listPicReload: (isNSFW: boolean) => void;
}

export const ApiContext = createContext<ApiContextInterface>({
  pics: imgData,
  quote,
  listQuotesLoad: () => undefined,
  clearList: () => undefined,
  listPicLoaded: (isNSFW: boolean) => undefined,
  listPicReload: (isNSFW: boolean) => undefined,
});

export const useApiContext = () => {
  const context = useContext(ApiContext);
  return context;
};

export const ApiPorvider = ({ children }: ApiProviderProps) => {
  const [listQuote, setQuote] = useState(quote);
  const [listPic, setListPic] = useState<Image[]>([]);
  const [isCurrentDataNSFW, setIsCurrentDataNSFW] = useState(false);
  const listPicLoaded = (isNSFW: boolean) => {
    setListPic(imgData);
    getRandomPics(isNSFW).then((pics) => setListPic(pics.images.slice(0, 10)));
    setIsCurrentDataNSFW(isNSFW);
  };

  const listQuotesLoad = () => {
    getRandomQuotes().then((quotes) => setQuote(quotes));
  };

  return (
    <ApiContext.Provider
      value={{
        pics: listPic,
        quote: listQuote,
        listQuotesLoad: listQuotesLoad,
        clearList: () => {
          setQuote([]), setListPic([]);
        },
        listPicLoaded: listPicLoaded,
        listPicReload: () => listPicLoaded(isCurrentDataNSFW),
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};
