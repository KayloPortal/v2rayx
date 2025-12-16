import "./App.css";
import Configs from "./Components/Configs";
import Section from "./Components/Section";
import Start from "./Components/Start";

function App() {
  return (
    <main className="container">
      <Start />
      <Section />
      <Configs />
    </main>
  );
}

export default App;
