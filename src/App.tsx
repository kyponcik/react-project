import { CheckboxWithLabel } from "./testing-example/ReactComponent/Checkbox";
import Fetch from "./testing-example/API calls/Fetch";

function App() {
  return (
    <div className="App">
      <Fetch url="/greeting" />
      {/* <CheckboxWithLabel labelOn="checked" labelOff="not checked" /> */}
    </div>
  );
}

export default App;
