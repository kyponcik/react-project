import { combineReducers } from "redux"
import { Quote,  Image } from "./interfaces/List"
import { adaptedItemData } from "./interfaces/ListItem";


interface IState {
   quote: Quote[];
   pics: Image[];
}


const initialState: IState = {
   quote: [],
   pics: [],
};

const GET_ALL_QUOTES = "GET_ALL_QUOTES";

interface GetAllQuotes {
   type: typeof GET_ALL_QUOTES;
   body:Quote[];
}

interface GetAllPics {
   type: "GET_ALL_PICS";
   body: Image[];
}

interface ClearData {
   type: "CLEAR_DATA";
   body: null;
}

type FirstReducerType = GetAllQuotes | GetAllPics | ClearData;

interface GetAdaptedData {
   type:"GET_ADAPTED_DATA";
   body: adaptedItemData[];
}



interface DeleteItem {
   type:"DELETE_ITEM";
   body:ItemId;
}

interface LikedItem {
   type:"LIKED_ITEM";
   body:ItemId;
}

type ItemId = Pick<adaptedItemData, "id">

type SecondReducerType = GetAdaptedData | DeleteItem | LikedItem;


const firstReducer = (state = initialState, action: FirstReducerType) => {
   const body = action.body;
   switch (action.type) {
      case "GET_ALL_QUOTES":
         return {...state, ...body };
      case "GET_ALL_PICS":
         return {...state, ...body};
      case "CLEAR_DATA":
         return initialState;
      default:
         return state;
   }
}

const initialData: adaptedItemData[] = [];

const secondReducer = (state = initialData, action: SecondReducerType) => {
   switch (action.type){
      case "GET_ADAPTED_DATA":
         const adaptedDataBody  = action.body as adaptedItemData[];  
      return adaptedDataBody;
      case "DELETE_ITEM":
          const deleteItemBody = action.body as ItemId
         return state.filter((item) => item.id !== deleteItemBody.id);
      case "LIKED_ITEM":
         const likedItemBody = action.body as ItemId
         const result = state.map((elem) => {
        if (elem.id === likedItemBody.id) {
          return { ...elem, isLiked: !elem.isLiked }; //...elem === копирование объекта по элементам {quote: elem.quote, pic: elem.pic, id: elem.id, isLiked: elem.isLiked}
        }
        return elem;
      });
      return result; 
      default:
         return state;
   }
}

export const ApiReducer = combineReducers({firstReducer, secondReducer })