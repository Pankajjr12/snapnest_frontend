import "./app.css";
import LeftBar from "./components/leftBar/LeftBar";
import TopBar from "./components/topBar/TopBar";
import Gallery from "./components/gallery/Gallery";

const App = () => {
  return (
    <div className="app">
      <LeftBar />
      <div className="content">
        <TopBar />
        <Gallery />
      </div>
    </div>
  );
};

export default App;
