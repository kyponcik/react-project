import { Main } from "./components/Main/Main";
import { ThemeProvider } from "./context/ThemeProvider";
import { ApiPorvider } from "./context/ApiProvider";

function App() {
  return (
    <ThemeProvider>
      <ApiPorvider>
        <Main />
      </ApiPorvider>
    </ThemeProvider>
  );
}

export default App;
