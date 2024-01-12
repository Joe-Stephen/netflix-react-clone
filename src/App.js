import "./App.css";
import Banner from "./Components/Banner/Banner";
import NavBar from "./Components/NavBar/NavBar";
import RowPost from "./Components/RowPost/RowPost";
import {
  originals,
  action,
  trending,
  sci_fi,
  documentaries,
  horror,
  romance,
} from "./urls";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Banner />
      <RowPost title="Netflix Originals" url={originals} />
      <RowPost title="Action" isSmall url={action} />
      <RowPost title="Documentaries" isSmall url={documentaries} />
      <RowPost title="Romance" isSmall url={romance} />
      <RowPost title="Horror" isSmall url={horror} />
    </div>
  );
}

export default App;
