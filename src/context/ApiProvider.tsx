import { ReactNode, createContext, useContext, useState } from "react";
import { getRandomQuotes } from "../api/getRandomQuotes";
import { getRandomPics } from "../api/getRandomPics";
import { useListAdapter } from "../hooks/useListAdapter";
import { useDispatch } from "react-redux";
import { GET_QUOTES, GET_PICS } from "../actions";

interface ApiProviderProps {
  children: ReactNode;
}

interface ApiContextInterface {
  listQuotesLoad: () => void;
  listPicLoaded: (isNSFW: boolean) => void;
  listPicReload: () => void;
}

export const ApiContext = createContext<ApiContextInterface>({
  listQuotesLoad: () => undefined,
  listPicLoaded: (isNSFW: boolean) => undefined,
  listPicReload: () => undefined,
});

export const useApiContext = () => {
  const context = useContext(ApiContext);
  return context;
};

export const ApiPorvider = ({ children }: ApiProviderProps) => {
  useListAdapter();
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

  const listPicReload = () => {
    getRandomPics(isCurrentDataNSFW).then((pics) =>
      dispatch(GET_PICS(pics.images.slice(0, 10)))
    );
  };

  return (
    <ApiContext.Provider
      value={{
        listQuotesLoad: listQuotesLoad,
        listPicLoaded: listPicLoaded,
        listPicReload: listPicReload,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};
