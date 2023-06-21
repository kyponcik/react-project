export const  summary = (num:number) =>{
   return {type: "SUM", body: num}
}

export const GET_QUOTES = (quote) =>{
   return {type:"GET_ALL_QUOTES",  body: {quote}  }
}

export const GET_PICS = (pics) => {
   return {type:"GET_ALL_PICS", body:{pics}}
}

export const CLEAR_DATA = () =>{
   return {type:"CLEAR_DATA"}
}

export const GET_ADAPTED_DATA = (data) => {
   return {type: "GET_ADAPTED_DATA", body:data}
}

export const DELETE_ITEM = (id) => {
   return {type: "DELETE_ITEM", body:{id}}
}