
export const List = ({listQuotes, listPic}) => {
   console.log(listQuotes[0], 'quote and pics')
   console.log(listPic, 'pics')
   const obj = {};
   const arr = [];
   const arr1 = [];  //Решение 
   listQuotes.map((elem, index) => arr1.push(
      <div>
         <li>{elem.quote}</li>
         <img src={listPic[index].url} style={{width: "400px", height: "400px"}}></img>
      </div>
      ));
   listQuotes.map((elem, index) => obj[index] = {quote: elem.quote, picUrl: listPic[index].url });
   console.log(obj)
   for (let i in obj){
      arr.push(<div>
                  <li>{obj[i].quote}</li>
                  <img src={obj[i].picUrl} style={{width: "400px", height: "400px"}}></img>
               </div>)
   }
   console.log(arr);
   
   return (     
      <>
         <ul className='list'>
            {arr1}
         </ul> 
      </>
   )
}