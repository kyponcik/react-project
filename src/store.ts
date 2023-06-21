import { createStore } from "redux";
import { ApiReducer } from "./ApiReducer";


export const store = createStore(ApiReducer);