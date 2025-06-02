import "./app.css";
import LeftBar from "./components/leftBar/LeftBar";
import TopBar from "./components/topBar/TopBar";
import Gallery from "./components/gallery/Gallery";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <div className="app">
      <ToastContainer position="top-right" autoClose={3000} />
      <LeftBar />
      <div className="content">
        <TopBar />
        <Gallery />
      </div>
    </div>
  );
};

export default App;
