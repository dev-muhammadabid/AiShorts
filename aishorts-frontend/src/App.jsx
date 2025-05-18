// Imports
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar';
import Intro1 from './components/Intro1';
import Intro2 from './components/Intro2';
import Intro3 from './components/Intro3';
import Footer from './components/Footer';
import Prompt from './components/prompt/Prompt';
import TwilioMain from './components/twilio/TwilioMain';
import Modal from './components/prompt/Modal';

import './App.css';

function App() {
  // State to control the visibility of the login modal
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <>
      <Routes>
        {/* Home route */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <div className="relative">
                {/* Main landing page content */}
                <Intro1 />
                <Intro2 />
                <Intro3 />
                <Footer />
              </div>

              {/* Conditional rendering of login modal */}
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

        {/* Prompt page route */}
        <Route path="/prompt" element={<Prompt />} />
      </Routes>
    </>
  );
}

export default App;
