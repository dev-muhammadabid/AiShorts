import "./App.css";
import Navbar from "./components/Navbar";
import Intro1 from "./components/Intro1";
import Intro2 from "./components/Intro2";
import Intro3 from "./components/Intro3";
import Footer from "./components/Footer";
import { Route, Routes } from "react-router-dom";
import Prompt from "./components/Prompt";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Intro1 />
              <Intro2 />
              <Intro3 />
              <Footer />
            </>
          }
        />
        <Route path="/prompt" element={<Prompt />} />
      </Routes>
    </>
  );
}

export default App;
