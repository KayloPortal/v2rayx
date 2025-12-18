import "./App.css";
import Configs from "./Components/Configs";
import Section from "./Components/Section";
import Start from "./Components/Start";
import Footer from "./Footer";

function App() {
  return (
    <main className="container">
      <Start />
      <Section />
      <Configs />
      <Footer />
    </main>
  );
}

export default App;
