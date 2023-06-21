import { Quote, Image } from "../interfaces/List";
import { v4 as uuidv4 } from "uuid";
import {useSelector, useDispatch} from "react-redux"
import { GET_ADAPTED_DATA } from "../actions";


export const useListAdapter = () => {

   const dispatch=useDispatch();
   const listQuotes = useSelector((state)=> state.firstReducer.quote)
   const listPic = useSelector((state)=> state.firstReducer.pics)
   const isDataLoaded = !!listQuotes.length && !!listPic.length;


   const adaptedList = isDataLoaded && listPic.map((elem, i) => {
      return {
        quote: listQuotes[i].quote,
        pic: elem.url,
        id: uuidv4(),
        isLiked: false,
      };
    });
    dispatch(GET_ADAPTED_DATA(adaptedList))
    return {adaptedList: adaptedList ? adaptedList: []}
  };