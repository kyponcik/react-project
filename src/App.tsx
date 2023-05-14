import { useState } from "react";
import "./App.css";
import { Button } from "./components/Button/Button";
import { List } from "./components/List/List";
import { getRandomQuotes } from "./api/getRandomQuotes";
import { getRandomPics } from "./api/getRandomPics";
import { Quote } from "./interfaces/List";

function App() {
  const [quote, setQuote] = useState<Quote[] | []>([]);
  const [pic, setPics] = useState([]);

  const handleClick = () => {
    getRandomQuotes().then((quotes) => setQuote(quotes));
    getRandomPics().then((pics) => setPics(pics.images.slice(0, 10)));
  };

  return (
    <div className="App">
      <Button onClick={handleClick} />
      <List listQuotes={quote} listPic={pic} />
    </div>
  );
}

export default App;
