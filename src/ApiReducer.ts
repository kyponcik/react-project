import { combineReducers } from "redux"


const initialState = {
   quote: [],
   pics: [],
};



const firstReducer = (state = initialState, action) => {
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

const initialData = [];

const secondReducer = (state = initialData, action) => {
   const body = action.body;
   switch (action.type){
      case "GET_ADAPTED_DATA":
         return body;
      case "DELETE_ITEM":
         return state.filter((item) => item.id !== body.id)
      default:
         return state;
   }
}

export const ApiReducer = combineReducers({firstReducer, secondReducer })