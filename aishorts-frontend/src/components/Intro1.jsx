// Imports
import { useState } from "react";
import { Link } from "react-router-dom"; // For client-side navigation without page reloads
import TwilioMain from "./twilio/TwilioMain"; // TwilioMain component for login/authentication modal content

const Intro1 = () => {
  // State to toggle modal visibility
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="bg-gray-950">
      <div className="mx-auto max-w-7xl py-16 px-6 sm:py-24 lg:py-32 lg:px-8">
        <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-12 shadow-2xl sm:rounded-3xl sm:px-12 md:py-16 lg:flex lg:items-center lg:gap-x-16 lg:px-20 lg:py-20">

          {/* Background SVG Circle with Gradient */}
          <svg
            viewBox="0 0 1024 1024"
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 -z-10 size-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
          >
            <circle cx={512} cy={512} r={512} fill="url(#gradient)" fillOpacity="0.7" />
            <defs>
              <radialGradient id="gradient">
                <stop stopColor="#7775D6" />
                <stop offset={1} stopColor="#E935C1" />
              </radialGradient>
            </defs>
          </svg>

          {/* Text Section with Heading, Description, and Get Started Button */}
          <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:text-left">
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              AiShorts delivers precise, AI-generated answers in 60 words.
            </h2>
            <p className="mt-6 text-lg text-gray-300">
              AiShorts simplifies information with AI-generated answers,
              offering compact, summarized responses within 60 words to save
              time and enhance clarity.
            </p>
            <div className="mt-8 flex justify-center lg:justify-start">
              {/* Button toggles modal visibility */}
              <button
                onClick={() => setShowModal(true)}
                className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white"
              >
                Get started
              </button>
            </div>
          </div>

          {/* Image Section showing app screenshot */}
          <div className="relative mt-12 h-64 lg:mt-0 lg:h-80">
            <img
              alt="App screenshot"
              src="/images/aishorts-web.png"
              className="w-full max-w-lg rounded-md bg-white/5 shadow-lg ring-1 ring-white/10 lg:max-w-none"
            />
          </div>
        </div>

        {/* Modal Overlay - shown when showModal is true */}
        {showModal && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md z-50 flex items-center justify-center"
            onClick={() => setShowModal(false)} // Close modal on clicking outside content
          >
            <div 
              className="bg-gray-700 rounded-lg p-8 max-w-md w-full mx-4 relative"
              onClick={(e) => e.stopPropagation()} // Prevent modal close when clicking inside modal content
            >
              {/* Close Button */}
              <button
                className="absolute top-4 right-4 bg-gray-700 text-grey-300 hover:text-green-600"
                onClick={() => setShowModal(false)} // Close modal when clicking X
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={5}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Modal content: TwilioMain component (for login/authentication) */}
              <TwilioMain />

              {/* Link to start using the app without login */}
              <div className="mt-4 text-center">
                <Link
                  to="/prompt"
                  className="text-white font-medium hover:text-green-600"
                >
                  Start without login
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Intro1;
