// App.jsx
import { useState } from 'react';
import "./App.css";
import Navbar from "./components/Navbar";
import Intro1 from "./components/Intro1";
import Intro2 from "./components/Intro2";
import Intro3 from "./components/Intro3";
import Footer from "./components/Footer";
import { Route, Routes} from "react-router-dom";
import Prompt from "./components/Prompt";
import TwilioMain from "./components/TwilioMain";
import Modal from './components/Modal';

function App() {
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <div className="relative">
                {/* Main Content */}
                <Intro1 />
                <Intro2 />
                <Intro3 />
                <Footer />
              </div>

               {/* Login Modal */}
              {showLoginModal && (
                <Modal onClose={() => setShowLoginModal(false)}>
                  <TwilioMain />
                  <div className="text-center mt-4">
                    <button
                      className="skip-login"
                      onClick={() => setShowLoginModal(false)}
                    >
                      Start without login
                    </button>
                  </div>
                </Modal>
              )}
            </>
          }
        />
        <Route path="/prompt" element={<Prompt />} />
      </Routes>
    </>
  );
}

export default App;