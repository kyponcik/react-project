import { useState } from 'react'
import './App.css'
import { Button } from './components/Button/Button'
import { List } from './components/List/List'
import { getRandomQuotes } from './api/getRandomQuotes'
import { getRandomPics } from './api/getRandomPics';



function App() {
   const [state, setState] = useState([]);
   const [pic, setPics] = useState([]);
   
   const handleClick = () => {
      getRandomQuotes().then((quotes) => setState(quotes))
      getRandomPics().then((pics) => setPics(pics.images.slice(0, 10)))
   }

   console.log(state)
  return (
    <div className="App">
      
      <Button onClick={handleClick}/>
      <List listQuotes={state} listPic={pic}/>
           
    </div>
  )
}

export default App
