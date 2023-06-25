import { Quote, ImageData } from "./interfaces/List"
import { adaptedItemData } from "./interfaces/ListItem"
export const  summary = (num:number) =>{
   return {type: "SUM", body: num}
}

export const GET_QUOTES = (quote:Quote[]) =>{
   return {type:"GET_ALL_QUOTES",  body: {quote}  }
}

export const GET_PICS = (pics:ImageData) => {
   return {type:"GET_ALL_PICS", body:{pics}}
}

export const CLEAR_DATA = () =>{
   return {type:"CLEAR_DATA"}
}

export const GET_ADAPTED_DATA = (data:adaptedItemData[]) => {
   return {type: "GET_ADAPTED_DATA", body:data ?? []}
}

export const DELETE_ITEM = (id:string) => {
   return {type: "DELETE_ITEM", body:{id}}
}

export const LIKED_ITEM = (id:string) => {
   return {type: "LIKED_ITEM", body:{id}}
}